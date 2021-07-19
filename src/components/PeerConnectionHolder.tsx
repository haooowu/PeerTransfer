import React, {useState, useEffect, useMemo, useRef, useCallback, useReducer} from 'react';
import firebase from 'src/services/firebase';
import {IFileMeta, IFirebaseConnectionRoomData, IPeerField} from 'src/types';
import pcConfig from 'src/utils/pcConfig';
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
  GOT_REMOTE_DESC,
  MAXIMUM_BUFFER_BYTE,
  MIN_CHUNK_SIZE,
  ROOT_COLLECTION,
  APP_AUTO_ACCEPT,
  APP_AUTO_DOWNLOAD,
} from 'src/constants';

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
  const sendChannelRef = useRef<RTCDataChannel | null>(null);
  const receiveChannelRef = useRef<RTCDataChannel | null>(null);
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
            data.p2p &&
            data.fileMetas &&
            !data.answer &&
            data.p2p.answer === localID &&
            data.p2p.offer === targetPeer.id
          ) {
            if (!isAccepting) {
              promptsIncomingFileTransferPopper(data.fileMetas, change.doc.id);
            }
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
      if (sessionStorage.getItem(GOT_REMOTE_DESC)) {
        toast.warn('Peer connection dropped');
        sessionStorage.removeItem(GOT_REMOTE_DESC);
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

  const closeDataChannels = useCallback(
    (shouldWarn: boolean) => {
      console.log('Closing data channels');
      console.log(sendChannelRef.current);
      console.log(receiveChannelRef.current);
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
      console.log('closing peer');
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
      console.log('Abort read!');
      sentFileReaderRef.current.abort();
    }
    if (notifyOfferPopperData.isOpen) {
      dispatchNotifyPopperOfferData({type: 'clear'});
    }
    closeDataChannels(false);
  };

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

  const sendFileData = useCallback(async () => {
    if (!acceptedFileListRef.current || acceptedFileListRef.current.length === 0) return;
    console.log(`Files:`, acceptedFileListRef.current);

    const files = [...acceptedFileListRef.current];

    const maxMessageSize = peerConnectionRef.current?.sctp?.maxMessageSize;
    console.log('maximum message size is: ', maxMessageSize);

    const chunkSize = maxMessageSize || MIN_CHUNK_SIZE;
    let singularOffset = 0;
    let targetFileIndex = 0;
    let totalOffset = 0;

    function onTransferSuccess() {
      toast.success('File has been transferred');
      singularOffset = 0;
      targetFileIndex = 0;
      totalOffset = 0;
      dispatchProgressPopperData({type: 'clear'});
      acceptedFileListRef.current = [];
    }

    sentFileReaderRef.current = new FileReader();
    sentFileReaderRef.current.addEventListener('error', (error) => console.error('Error reading file:', error));
    sentFileReaderRef.current.addEventListener('abort', (event) => console.log('File reading aborted:', event));
    sentFileReaderRef.current.addEventListener('load', (event) => {
      console.log('FileRead.onload ', event);
      let result = event!.target!.result as ArrayBuffer;

      (sendChannelRef.current as RTCDataChannel).send(result);

      totalOffset += result.byteLength;
      singularOffset += result.byteLength;

      let sentProgress = Math.round((totalOffset / totalFileSizeRef.current) * 100);

      dispatchProgressPopperData({
        type: 'set_sent_progress',
        payload: {progress: sentProgress},
      });

      if (totalOffset < totalFileSizeRef.current) {
        (function checkBufferAmount() {
          // for Chrome as maxMessageSize is unstable with chromium buffer
          if ((sendChannelRef.current as RTCDataChannel).bufferedAmount + result.byteLength < MAXIMUM_BUFFER_BYTE) {
            readSlice(singularOffset);
          } else {
            setTimeout(checkBufferAmount, 500);
          }
        })();
      } else {
        console.log('done');
        onTransferSuccess();
      }
    });

    const readSlice = (o: number) => {
      console.log(`read ${files[targetFileIndex].name} slice `, o);
      console.log('total fileChunks', totalOffset);

      let slice: Blob;

      if (o < files[targetFileIndex].size) {
        let nextChunk: number = o + chunkSize;

        if (nextChunk > files[targetFileIndex].size) nextChunk = files[targetFileIndex].size;

        slice = files[targetFileIndex].slice(singularOffset, nextChunk);
      } else {
        targetFileIndex += 1;
        singularOffset = 0;
        if (!files[targetFileIndex]) {
          onTransferSuccess();
          return;
        }
        slice = files[targetFileIndex].slice(singularOffset, chunkSize);
      }

      sentFileReaderRef.current!.readAsArrayBuffer(slice);
    };

    readSlice(0);
  }, [totalFileSizeRef, sentFileReaderRef, sendChannelRef, acceptedFileListRef]);

  const createReceiveDataChannel = useCallback(() => {
    peerConnectionRef.current!.ondatachannel = receiveChannelCallback;

    const roomRef = firestoreDbRef.collection(ROOT_COLLECTION).doc(publicID);
    const connectionRef = roomRef.collection(CONNECTIONS).doc(connectionIdRef.current as string);

    let completeFlag = 0;
    let receivedSize = 0;
    let targetFileIndex = 0;
    let targetFileSize = 0;
    let receiveBuffer: ArrayBuffer[] = [];

    function receiveChannelCallback(event: RTCDataChannelEvent) {
      console.log('Receive Channel Callback');
      receiveChannelRef.current = event.channel;
      receiveChannelRef.current.binaryType = 'arraybuffer';
      receiveChannelRef.current.onmessage = onReceiveMessageCallback;
      receiveChannelRef.current.onopen = onReceiveChannelStateChange;
      receiveChannelRef.current.onclose = onReceiveChannelStateChange;
    }

    async function onReceiveMessageCallback(event: MessageEvent<ArrayBuffer>) {
      const connectionSnapShot = await connectionRef.get();
      if (!connectionSnapShot.data()) return;

      console.log(`Received Message ${event.data.byteLength}`);
      console.log(event.data);

      receiveBuffer.push(event.data);
      receivedSize += event.data.byteLength;
      targetFileSize += event.data.byteLength;

      const fileMetas = connectionSnapShot.data()!.fileMetas as IFileMeta[];
      const totalSize = fileMetas.reduce((acc, file) => acc + file.size, 0);

      let {name, size} = fileMetas[targetFileIndex];
      let receivedValue = Math.round((receivedSize / totalSize) * 100);

      dispatchProgressPopperData({
        type: 'set_received_progress',
        payload: {progress: receivedValue},
      });

      // chunk size sent up to a exact file size in order, set to next
      if (targetFileSize === size) {
        const received = new Blob(receiveBuffer);
        receiveBuffer = [];
        targetFileSize = 0;
        targetFileIndex += 1;

        handleDownloadFile(received, name);
      }
      if (receivedSize === totalSize) {
        completeFlag = 1;
        closeDataChannels(false);
      }
    }

    async function onReceiveChannelStateChange() {
      console.log(receiveChannelRef.current);
      console.log(receiveChannelRef.current);
      if (receiveChannelRef.current) {
        const readyState = receiveChannelRef.current.readyState;
        console.log(`Receive channel state is: ${readyState}`);
        if (readyState === 'open') {
          dispatchWaitResponsePopperData({type: 'clear'});
        }
        if (readyState === 'closed') {
          if (!completeFlag) toast.warn('File transfer is cancelled');
          completeFlag = 0;
          receiveChannelRef.current = null;
        }
      }
    }
  }, [firestoreDbRef, peerConnectionRef, receiveChannelRef, publicID, closeDataChannels]);

  const createSendDataChannel = useCallback(() => {
    sendChannelRef.current = peerConnectionRef.current!.createDataChannel('sendDataChannel');
    console.log('Created send data channel: ', sendChannelRef.current);

    sendChannelRef.current.binaryType = 'arraybuffer';
    sendChannelRef.current.onopen = onSendChannelStateChange;
    sendChannelRef.current.onclose = onSendChannelStateChange;
    sendChannelRef.current.onerror = onError;

    function onSendChannelStateChange() {
      console.log('send channel:');
      console.log(sendChannelRef.current);
      if (sendChannelRef.current) {
        const {readyState} = sendChannelRef.current;
        console.log(`Send channel state is: ${readyState}`);
        if (readyState === 'open') {
          sendFileData();
          dispatchWaitResponsePopperData({type: 'clear'});
        }
        if (readyState === 'closed') {
          sendChannelRef.current = null;
        }
      }
    }
    function onError(errorEvent: RTCErrorEvent) {
      if (sendChannelRef.current) {
        console.error('Error in sendChannel:', errorEvent);
        return;
      }
      console.log('Error in sendChannel which is already closed:', errorEvent);
    }
  }, [peerConnectionRef, sendChannelRef, sendFileData]);

  const joinTransferChannel = async (connectionID: string) => {
    const roomRef = firestoreDbRef.collection(ROOT_COLLECTION).doc(publicID);
    const connectionRef = roomRef.collection(CONNECTIONS).doc(connectionID);
    const connectionSnapshot = await connectionRef.get();

    if (connectionSnapshot.exists) {
      connectionIdRef.current = connectionID;
      peerConnectionRef.current = new RTCPeerConnection(pcConfig);

      createReceiveDataChannel();

      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = connectionRef.collection(CALLEE);

      peerConnectionRef.current.addEventListener('icecandidate', (event) => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        calleeCandidatesCollection.add(event.candidate.toJSON());
      });
      // Code for collecting ICE candidates above

      // Code for creating SDP answer below
      const offer = connectionSnapshot!.data()!.offer;
      console.log('Got offer:', offer);
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnectionRef.current.createAnswer();
      console.log('Created answer:', answer);
      await peerConnectionRef.current.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
        isAccepting: true,
      };
      await connectionRef.update(roomWithAnswer);
      // Code for creating SDP answer above

      // Listening for remote ICE candidates below
      const calllerUnsubscriber = connectionRef.collection(CALLER).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            let data = change.doc.data();
            console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
            console.log(peerConnectionRef.current);
            await peerConnectionRef.current!.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listening for remote ICE candidates above
      callerUnsubscriberRef.current = calllerUnsubscriber;
    }
  };

  const tryCreatePeerConnection = async (peer: IPeerField) => {
    const roomRef = firestoreDbRef.collection(ROOT_COLLECTION).doc(publicID);
    const connectionsRef = roomRef.collection(CONNECTIONS);
    const targetConnectionRef = connectionsRef.doc();

    const p2pData = {
      p2p: {
        offer: localID,
        answer: peer.id,
      },
    };

    const callerCandidatesCollection = targetConnectionRef.collection(CALLER);

    peerConnectionRef.current = new RTCPeerConnection(pcConfig);
    console.log('created pc', peerConnectionRef.current);
    connectionIdRef.current = targetConnectionRef.id;

    createSendDataChannel();

    peerConnectionRef.current.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for creating a room below
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    console.log('Created offer:', offer);

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
      isAccepting: false,
    };

    await targetConnectionRef.set({
      ...roomWithOffer,
      ...p2pData,
    });

    // Listening for remote session description below
    const descriptionUnsubscriber = targetConnectionRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!data || !data.answer) return;
      if (peerConnectionRef.current && !peerConnectionRef.current!.currentRemoteDescription) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnectionRef.current!.setRemoteDescription(rtcSessionDescription);

        dispatchWaitResponsePopperData({type: 'set_desc'});
      }
    });
    // Listening for remote session description above
    descriptionUnsubscriberRef.current = descriptionUnsubscriber;

    // Listen for remote ICE candidates below
    const calleeUnsubscriber = targetConnectionRef.collection(CALLEE).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnectionRef.current!.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above
    calleeUnsubscriberRef.current = calleeUnsubscriber;

    dispatchWaitResponsePopperData({type: 'set_open_without_desc'});
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
