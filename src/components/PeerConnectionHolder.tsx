import React, {useState, useEffect, useMemo, useRef, useCallback, useReducer} from 'react';
import firebase from 'src/services/firebase';
import {IFileMeta, IFirebaseConnectionRoomData, IPeerField} from 'src/types';
import {toast} from 'react-toastify';
import PeerFileDropZone from 'src/components/DropZone/PeerFileDropZone';
import ProgressPopper, {initialProgressPopperData, progressPopperReducer} from 'src/components/Poppers/ProgressPopper';
import NotifyOfferPopper, {
  notifyOfferPopperReducer,
  initialNotifyOfferPopperData,
} from 'src/components/Poppers/NotifyOfferPopper';
import WaitResponsePopper, {
  initialWaitResponsePopperData,
  waitResponsePopperReducer,
} from 'src/components/Poppers/WaitResponsePopper';
import {
  CALLEE,
  CALLER,
  CONNECTIONS,
  FILE_METAS,
  WAIT_REMOTE_DESC,
  ROOT_COLLECTION,
  APP_AUTO_ACCEPT,
  APP_AUTO_DOWNLOAD,
} from 'src/constants';
import useJoinTransferChannel from 'src/components/useJoinTransferChannel';
import useCreateTransferChannel from 'src/components/useCreateTransferChannel';

interface Props {
  targetPeer: IPeerField;
  localID: string;
  publicID: string;
  sendAllFiles: File[];
  clearSentAllFiles: () => void;
  firestoreDbRef: firebase.firestore.Firestore;
}

const PeerConnectionHolder: React.FC<Props> = ({
  targetPeer,
  localID,
  publicID,
  firestoreDbRef,
  sendAllFiles,
  clearSentAllFiles,
}) => {
  const isInit = useRef(true);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const connectionIdRef = useRef<string | null>(null);
  const sentFileReaderRef = useRef<FileReader | null>(null);
  const totalFileSizeRef = useRef<number>(0);
  const acceptedFileListRef = useRef<File[]>([]);
  const callerUnsubscriberRef = useRef<() => void>();
  const calleeUnsubscriberRef = useRef<() => void>();
  const descriptionUnsubscriberRef = useRef<() => void>();

  const [anchorElement, setAnchorElement] = useState(null);

  const [waitResponsePopperData, dispatchWaitResponsePopperData] = useReducer(
    waitResponsePopperReducer,
    initialWaitResponsePopperData,
  );
  const [notifyOfferPopperData, dispatchNotifyPopperOfferData] = useReducer(
    notifyOfferPopperReducer,
    initialNotifyOfferPopperData,
  );
  const [progressPopperData, dispatchProgressPopperData] = useReducer(progressPopperReducer, initialProgressPopperData);

  const shouldDisableActionBtn = useMemo(
    () => waitResponsePopperData.isOpen || notifyOfferPopperData.isOpen || progressPopperData.isOpen,
    [waitResponsePopperData.isOpen, notifyOfferPopperData.isOpen, progressPopperData.isOpen],
  );

  useEffect(() => {
    const roomRef = firestoreDbRef.collection(ROOT_COLLECTION).doc(publicID);
    const connectionRef = roomRef.collection(CONNECTIONS);

    const unsubscribe = connectionRef.onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        let data = change.doc.data() as IFirebaseConnectionRoomData;
        if (change.type === 'modified') {
          const {isAccepting} = data;
          if (
            !isAccepting &&
            !data.answer &&
            data.fileMetas &&
            data.p2p &&
            data.p2p.answer === localID &&
            data.p2p.offer === targetPeer.id
          ) {
            promptsIncomingFileTransferPopper(data.fileMetas, change.doc.id);
          }
        }
        if (change.type === 'removed') {
          let connectionId = change.doc.id;
          console.log('remove connection: ');
          console.log(connectionId, connectionIdRef.current);
          if (
            connectionId === connectionIdRef.current &&
            data.p2p &&
            (data.p2p.answer === localID || data.p2p.offer === localID)
          ) {
            closeDataChannels(true);
          }
        }
      });
    });

    return () => {
      // close connection and delete the document on peer presence drop
      unsubscribe();
      closeDataChannels(false);
      destroyExistingPC();
      if (sessionStorage.getItem(WAIT_REMOTE_DESC)) {
        toast.warn('Peer connection dropped');
        sessionStorage.removeItem(WAIT_REMOTE_DESC);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
    } else {
      handleFileInputChange([...sendAllFiles]);
      clearSentAllFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInit, sendAllFiles]);

  const clearFirebaseConnection = useCallback(async () => {
    if (callerUnsubscriberRef.current) callerUnsubscriberRef.current();
    if (calleeUnsubscriberRef.current) calleeUnsubscriberRef.current();
    if (descriptionUnsubscriberRef.current) descriptionUnsubscriberRef.current();

    const connectionId = connectionIdRef.current;
    if (connectionId) {
      const roomRef = firestoreDbRef.collection(ROOT_COLLECTION).doc(publicID);
      const connectionRef = roomRef.collection(CONNECTIONS).doc(connectionId);
      const calleeCandidates = await connectionRef.collection(CALLEE).get();
      calleeCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidates = await connectionRef.collection(CALLER).get();
      callerCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      await connectionRef.delete();
      connectionIdRef.current = null;
    }
  }, [
    firestoreDbRef,
    connectionIdRef,
    callerUnsubscriberRef,
    calleeUnsubscriberRef,
    descriptionUnsubscriberRef,
    publicID,
  ]);

  const handleDownloadFile = (receivedBlob: Blob, name: string) => {
    const appAutoDownload = window.localStorage.getItem(APP_AUTO_DOWNLOAD);
    const shouldAutoDownload = appAutoDownload === 'true';

    if (shouldAutoDownload) {
      let downloadAnchor = document.createElement('a');
      downloadAnchor.href = URL.createObjectURL(receivedBlob);
      downloadAnchor.download = name;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      window.URL.revokeObjectURL(downloadAnchor.href);
      document.body.removeChild(downloadAnchor);
    } else {
      dispatchProgressPopperData({
        type: 'set_downloadableFiles',
        payload: {
          downloadableFile: {
            fileName: name,
            fileBlobUrl: URL.createObjectURL(receivedBlob),
          },
        },
      });
    }
  };

  const {receiveChannelRef, joinTransferChannel} = useJoinTransferChannel({
    publicID,
    firestoreDbRef,
    connectionIdRef,
    peerConnectionRef,
    callerUnsubscriberRef,
    dispatchProgressPopperData,
    dispatchWaitResponsePopperData,
    handleDownloadFile,
    clearSignalService: clearFirebaseConnection,
  });

  const {sendChannelRef, tryCreatePeerConnection} = useCreateTransferChannel({
    localID,
    publicID,
    firestoreDbRef,
    connectionIdRef,
    peerConnectionRef,
    calleeUnsubscriberRef,
    descriptionUnsubscriberRef,
    totalFileSizeRef,
    sentFileReaderRef,
    acceptedFileListRef,
    dispatchProgressPopperData,
    dispatchWaitResponsePopperData,
  });

  const closeDataChannels = useCallback(
    (shouldWarn: boolean) => {
      // console.log('Closing data channels: ');
      dispatchWaitResponsePopperData({type: 'clear'});

      if (sendChannelRef.current) {
        sendChannelRef.current.close();
        if (shouldWarn) toast.warn('File transfer is closed');
        console.log(`Closed send data channel with label: ${sendChannelRef.current.label}`);
      }
      if (receiveChannelRef.current) {
        receiveChannelRef.current.close();
        console.log(`Closed receive data channel with label: ${receiveChannelRef.current.label}`);
      }
      clearFirebaseConnection();
    },
    [sendChannelRef, receiveChannelRef, clearFirebaseConnection],
  );

  const destroyExistingPC = useCallback(() => {
    if (peerConnectionRef.current) {
      console.log('closing peers connection');
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
      // window.location.reload();
    }
  }, [peerConnectionRef]);

  async function handleFileInputChange(files: File[]) {
    if (files.length > 0) {
      acceptedFileListRef.current = files;

      await tryCreatePeerConnection(targetPeer);
      const connectionId = connectionIdRef.current as string;

      const roomRef = firestoreDbRef.collection(ROOT_COLLECTION).doc(publicID);
      const connectionsRef = roomRef.collection(CONNECTIONS);
      const targetConnectionRef = connectionsRef.doc(connectionId);

      let metas: IFileMeta[] = [];

      files.forEach((file) => {
        metas.push({
          name: file.name,
          size: file.size,
          type: file.type,
        });
        totalFileSizeRef.current += file.size;
      });

      let fileMetas = {
        [FILE_METAS]: metas,
      };

      await targetConnectionRef.update(fileMetas);
    }
  }

  const onAcceptFileTransfer = () => {
    joinTransferChannel(connectionIdRef.current as string);
    if (!waitResponsePopperData.isOpen) {
      dispatchWaitResponsePopperData({type: 'set_open_with_desc'});
    }
  };

  const onCancelFileTransfer = () => {
    if (sentFileReaderRef.current && sentFileReaderRef.current.readyState === 1) {
      console.log('Abort file read...');
      sentFileReaderRef.current.abort();
    }
    if (notifyOfferPopperData.isOpen) {
      dispatchNotifyPopperOfferData({type: 'clear'});
    }
    closeDataChannels(false);
  };

  const promptsIncomingFileTransferPopper = async (fileMetas: IFileMeta[], connectionId: string) => {
    console.log('incoming file metas:', fileMetas);
    console.log('got from:', targetPeer);

    connectionIdRef.current = connectionId;

    const appAutoAccept = window.localStorage.getItem(APP_AUTO_ACCEPT);
    const shouldAutoAccept = appAutoAccept === 'true';

    if (shouldAutoAccept) {
      onAcceptFileTransfer();
    } else {
      dispatchNotifyPopperOfferData({type: 'set_file_metas', payload: {fileMetas}});
    }
  };

  return (
    <div className="peerHolder">
      <PeerFileDropZone
        shouldDisableActionBtn={shouldDisableActionBtn}
        handleFileInputChange={handleFileInputChange}
        targetPeer={targetPeer}
        setAnchorElement={setAnchorElement}
      />

      {waitResponsePopperData.isOpen && (
        <WaitResponsePopper {...waitResponsePopperData} targetPeer={targetPeer} anchorElement={anchorElement} />
      )}

      {progressPopperData.isOpen && (
        <ProgressPopper
          {...progressPopperData}
          onCancelFileTransfer={onCancelFileTransfer}
          targetPeer={targetPeer}
          setClose={() => dispatchProgressPopperData({type: 'clear'})}
          anchorElement={anchorElement}
        />
      )}

      {notifyOfferPopperData.isOpen && (
        <NotifyOfferPopper
          {...notifyOfferPopperData}
          onAcceptFileTransfer={onAcceptFileTransfer}
          onCancelFileTransfer={onCancelFileTransfer}
          targetPeer={targetPeer}
          setClose={() => dispatchNotifyPopperOfferData({type: 'clear'})}
          anchorElement={anchorElement}
        />
      )}
    </div>
  );
};

export default PeerConnectionHolder;
