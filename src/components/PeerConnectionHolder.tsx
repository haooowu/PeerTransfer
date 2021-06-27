import React, {useState, useEffect, useRef, ChangeEvent, useCallback} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {IFileMeta, IPeerField} from 'src/types';
import pcConfig from 'src/utils/pcConfig';
import {toast} from 'react-toastify';
import Dropzone from 'react-dropzone';

import ProgressPopper, {IProgressPopperData, initialProgressPopperData} from 'src/components/Poppers/ProgressPopper';
import NotifyOfferPopper, {INotifyOfferPopperData} from 'src/components/Poppers/NotifyOfferPopper';
import WaitResponsePopper, {IWaitResponsePopperData} from 'src/components/Poppers/WaitResponsePopper';

interface Props {
  targetPeer: IPeerField;
  localID: string;
  publicID: string;
}

// TODO-sprint: on any rejection delete doc and all nested data

// TODO-sprint: once waiting connection / transferring disable event on same peer

// TODO-sprint: polish detail styling

const PeerIdentifier: React.FC<Props> = ({targetPeer, localID, publicID}) => {
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const connectionIdRef = useRef<string | null>(null);
  const sendChannelRef = useRef<RTCDataChannel | null>(null);
  const receiveChannelRef = useRef<RTCDataChannel | null>(null);
  const sentFileReaderRef = useRef<FileReader | null>(null);
  const totalFileSizeRef = useRef<number>(0);

  const anchorRef = useRef(null);
  const [anchorElement, setAnchorElement] = useState(null);
  useEffect(() => {
    if (anchorRef.current) setAnchorElement(anchorRef.current);
  }, [anchorRef]);

  const [waitResponsePopperData, setWaitResponsePopperData] = useState<IWaitResponsePopperData>({
    isOpen: false,
    gotRemoteDesc: false,
  });
  const [notifyOfferPopperData, setNotifyPopperOfferData] = useState<INotifyOfferPopperData>({
    isOpen: false,
    fileMetas: null,
  });
  const [progressPopperData, setProgressPopperData] = useState<IProgressPopperData>({...initialProgressPopperData});

  async function handleFileInputChange(files: File[], targetPeer: IPeerField) {
    if (files.length > 0) {
      await tryCreatePeerConnection(targetPeer);
      const connectionId = connectionIdRef.current as string;

      const db = firebase.firestore();
      const roomRef = db.collection('rooms').doc(publicID);
      const connectionsRef = roomRef.collection('connections');
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
        fileMetas: metas,
      };

      await targetConnectionRef.update(fileMetas);
    }
  }

  const clearFirebaseConnection = useCallback(async () => {
    const connectionId = connectionIdRef.current;
    if (connectionId) {
      const db = firebase.firestore();
      const roomRef = db.collection('rooms').doc(`${publicID}`);
      const connectionRef = roomRef.collection('connections').doc(connectionId);
      const calleeCandidates = await connectionRef.collection('calleeCandidates').get();
      calleeCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidates = await connectionRef.collection('callerCandidates').get();
      callerCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      await connectionRef.delete();
    }
  }, [connectionIdRef, publicID]);

  const closeDataChannels = useCallback(() => {
    console.log('Closing data channels');
    console.log(sendChannelRef.current);
    console.log(receiveChannelRef.current);
    if (sendChannelRef.current) {
      sendChannelRef.current.close();
      console.log(`Closed data channel with label: ${sendChannelRef.current.label}`);
    }
    if (receiveChannelRef.current) {
      receiveChannelRef.current.close();
      console.log(`Closed data channel with label: ${receiveChannelRef.current.label}`);
    }
    clearFirebaseConnection();
  }, [sendChannelRef, receiveChannelRef, clearFirebaseConnection]);

  const destroyExistingPC = useCallback(() => {
    if (peerConnectionRef.current) {
      console.log('closing peer');
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
      // window.location.reload();
    }
  }, [peerConnectionRef]);

  async function promptsIncomingFileTransferPopper(fileMetas: IFileMeta[], connectionId: string) {
    console.log('incoming file metas:', fileMetas);
    console.log('got from:', targetPeer);

    connectionIdRef.current = connectionId;
    setNotifyPopperOfferData({isOpen: true, fileMetas});
  }

  async function onAcceptFileTransfer() {
    joinFileChannel(connectionIdRef.current as string);

    if (!waitResponsePopperData.isOpen) {
      setWaitResponsePopperData({
        isOpen: true,
        gotRemoteDesc: true,
      });
    }
  }

  const sendFileData = useCallback(async () => {
    const fileInput = document.getElementById(`fileInput-${targetPeer.id}`) as HTMLInputElement;
    const files = fileInput!.files;

    if (!files) return;
    console.log(`Files:`, files);

    const chunkSize = 16384;
    let singularOffset = 0;
    let targetFileIndex = 0;
    let totalOffset = 0;

    function onTransferSuccess() {
      toast.success('Success Notification !');
      singularOffset = 0;
      targetFileIndex = 0;
      totalOffset = 0;
      setProgressPopperData({...initialProgressPopperData});
    }

    sentFileReaderRef.current = new FileReader();
    sentFileReaderRef.current.addEventListener('error', (error) => console.error('Error reading file:', error));
    sentFileReaderRef.current.addEventListener('abort', (event) => console.log('File reading aborted:', event));
    sentFileReaderRef.current.addEventListener('load', async (e) => {
      console.log('FileRead.onload ', e);
      let result = e!.target!.result as ArrayBuffer;

      (sendChannelRef.current as RTCDataChannel).send(result);

      totalOffset += result.byteLength;
      singularOffset += result.byteLength;

      setProgressPopperData((prev) => ({
        ...prev,
        isOpen: true,
        progressType: 'send',
        fileProgress: Math.round((totalOffset / totalFileSizeRef.current) * 100),
      }));

      if (totalOffset < totalFileSizeRef.current) {
        readSlice(singularOffset);
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
  }, [totalFileSizeRef, sentFileReaderRef, sendChannelRef, targetPeer.id]);

  async function onRejectFileTransfer() {
    // TODO-sprint: diff abort and reject
    if (sentFileReaderRef.current && sentFileReaderRef.current.readyState === 1) {
      console.log('Abort read!');
      sentFileReaderRef.current.abort();
      closeDataChannels();
    }
  }

  useEffect(() => {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(publicID);
    const connectionRef = roomRef.collection('connections');

    const unsubscribe = connectionRef.onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        let data = change.doc.data();
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
            connectionId === connectionIdRef.current ||
            (data.p2p && (data.p2p.answer === localID || data.p2p.offer === localID))
          ) {
            closeDataChannels();
          }
        }
      });
    });

    return () => {
      // close connection and delete the document on peer presence drop
      unsubscribe();
      closeDataChannels();
      destroyExistingPC();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createReceiveDataChannel = useCallback(() => {
    peerConnectionRef.current!.ondatachannel = receiveChannelCallback;
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(publicID);
    const connectionRef = roomRef.collection('connections').doc(connectionIdRef.current as string);

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

      setProgressPopperData((prev) => ({
        ...prev,
        isOpen: true,
        progressType: 'receive',
        fileProgress: receivedValue,
      }));

      // chunk size sent up to a exact file size in order, set to next
      if (targetFileSize === size) {
        const received = new Blob(receiveBuffer);
        receiveBuffer = [];
        targetFileSize = 0;
        targetFileIndex += 1;

        setProgressPopperData((prev) => ({
          ...prev,
          downloadableFiles: [
            ...prev.downloadableFiles,
            {
              fileName: name,
              fileBlobUrl: URL.createObjectURL(received),
            },
          ],
        }));
      }
      if (receivedSize === totalSize) closeDataChannels();
    }

    async function onReceiveChannelStateChange() {
      console.log(receiveChannelRef.current);
      console.log(receiveChannelRef.current);
      if (receiveChannelRef.current) {
        const readyState = receiveChannelRef.current.readyState;
        console.log(`Receive channel state is: ${readyState}`);
        if (readyState === 'open') {
          setWaitResponsePopperData({
            gotRemoteDesc: false,
            isOpen: false,
          });
        }
        if (readyState === 'closed') {
          receiveChannelRef.current?.close();
          receiveChannelRef.current = null;
        }
      }
    }
  }, [peerConnectionRef, receiveChannelRef, publicID, closeDataChannels]);

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
          setWaitResponsePopperData({
            gotRemoteDesc: false,
            isOpen: false,
          });
        }

        if (readyState === 'closed') {
          sendChannelRef.current?.close();
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

  const joinFileChannel = async (connectionID: string) => {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(publicID);
    const connectionRef = roomRef.collection('connections').doc(connectionID);
    const connectionSnapshot = await connectionRef.get();

    if (connectionSnapshot.exists) {
      connectionIdRef.current = connectionID;
      peerConnectionRef.current = new RTCPeerConnection(pcConfig);

      createReceiveDataChannel();

      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = connectionRef.collection('calleeCandidates');

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
      connectionRef.collection('callerCandidates').onSnapshot((snapshot) => {
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
    }
  };

  const tryCreatePeerConnection = async (peer: IPeerField) => {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(publicID);
    const connectionsRef = roomRef.collection('connections');
    const targetConnectionRef = connectionsRef.doc();

    const p2pData = {
      p2p: {
        offer: localID,
        answer: peer.id,
      },
    };

    const callerCandidatesCollection = targetConnectionRef.collection('callerCandidates');

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
    targetConnectionRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!data || !data.answer) return;
      if (peerConnectionRef.current && !peerConnectionRef.current!.currentRemoteDescription) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnectionRef.current!.setRemoteDescription(rtcSessionDescription);

        setWaitResponsePopperData((prev) => ({
          ...prev,
          gotRemoteDesc: true,
        }));
      }
    });
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    targetConnectionRef.collection('calleeCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnectionRef.current!.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above

    setWaitResponsePopperData({
      isOpen: true,
      gotRemoteDesc: false,
    });
  };

  return (
    <div>
      <Dropzone
        onDragEnter={() => console.log('drag enter')}
        onDragLeave={() => console.log('drag leave')}
        onDrop={(acceptedFiles) => handleFileInputChange(acceptedFiles, targetPeer)}
      >
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <Button
              ref={anchorRef}
              onClick={() => ((document.getElementById(`fileInput-${targetPeer.id}`) as HTMLInputElement).value = '')}
              color="primary"
              variant="contained"
            >
              <input id={`fileInput-${targetPeer.id}`} {...getInputProps()} />
              <span>{targetPeer.emoji}</span>
            </Button>
          </div>
        )}
      </Dropzone>

      {waitResponsePopperData.isOpen && (
        <WaitResponsePopper
          isOpen={waitResponsePopperData.isOpen}
          gotRemoteDesc={waitResponsePopperData.gotRemoteDesc}
          targetPeer={targetPeer}
          setClose={() => setWaitResponsePopperData({...waitResponsePopperData, isOpen: false})}
          anchorElement={anchorElement}
        />
      )}

      {progressPopperData.isOpen && (
        <ProgressPopper
          isOpen={progressPopperData.isOpen}
          fileProgress={progressPopperData.fileProgress}
          downloadableFiles={progressPopperData.downloadableFiles}
          onRejectFileTransfer={onRejectFileTransfer}
          progressType={progressPopperData.progressType}
          targetPeer={targetPeer}
          setClose={() => setProgressPopperData({...initialProgressPopperData})}
          anchorElement={anchorElement}
        />
      )}

      {notifyOfferPopperData.isOpen && (
        <NotifyOfferPopper
          isOpen={notifyOfferPopperData.isOpen}
          fileMetas={notifyOfferPopperData.fileMetas}
          onAcceptFileTransfer={onAcceptFileTransfer}
          onRejectFileTransfer={onRejectFileTransfer}
          targetPeer={targetPeer}
          setClose={() => setNotifyPopperOfferData({...notifyOfferPopperData, isOpen: false})}
          anchorElement={anchorElement}
        />
      )}
    </div>
  );
};

export default PeerIdentifier;
