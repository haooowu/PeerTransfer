import React, {useState, useEffect, useRef, ChangeEvent, useCallback} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {IFileMeta, IPeerField} from 'src/types';
import pcConfig from 'src/utils/pcConfig';

import ProgressPopper, {IProgressPopperData} from 'src/components/Poppers/ProgressPopper';
import NotifyOfferPopper, {INotifyOfferPopperData} from 'src/components/Poppers/NotifyOfferPopper';
import WaitResponsePopper, {IWaitResponsePopperData} from 'src/components/Poppers/WaitResponsePopper';

interface Props {
  targetPeer: IPeerField;
  localID: string;
  publicID: string;
}

// TODO-sprint: UI to abort fileReader transfer

// TODO-sprint: react-dropzone to wrap input and drop to change file

// TODO-sprint: if reject delete doc and all nested data

// TODO-sprint: UI for join BY roomID dialog (that should only add to presenceDB)

// TODO-sprint: once connection is established disable reselection

// 1. receiver upon listen to connectionIDs snapshot, for every connection that p2p contains self,
//   and there is not yet both answer and offer created, show UI indicate fileMeta and UI to accept/decline
// - accept: add callee candidates collection, create answer
// - decline: delete the target connection document

// 2. offer end:
// - decline: upon listen to snapshot iff no such room, or manual cannel, close peerconnection
// - accept: upon got all answer from connectionId, send file Data

const PeerIdentifier: React.FC<Props> = ({targetPeer, localID, publicID}) => {
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const connectionIdRef = useRef<string | null>(null);
  const sendChannelRef = useRef<RTCDataChannel | null>(null);
  const receiveChannelRef = useRef<RTCDataChannel | null>(null);
  const sentFileReaderRef = useRef<FileReader | null>(null);

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
    fileMeta: null,
  });
  const [progressPopperData, setProgressPopperData] = useState<IProgressPopperData>({
    isOpen: false,
    progressType: null,
    fileProgress: 0,
  });

  function handleFileAbort() {
    if (sentFileReaderRef.current && sentFileReaderRef.current.readyState === 1) {
      console.log('Abort read!');
      sentFileReaderRef.current.abort();
    }
  }

  async function handleFileInputChange(e: ChangeEvent<HTMLInputElement>, targetPeer: IPeerField) {
    let file = e.target?.files && e.target?.files[0];
    if (file) {
      await tryCreatePeerConnection(targetPeer);

      const fileMeta = {
        fileMeta: {
          name: file.name,
          size: file.size,
          type: file.type,
          isAccepting: false,
        },
      };

      console.log('got file', fileMeta);

      const connectionId = connectionIdRef.current as string;

      const db = firebase.firestore();
      const roomRef = db.collection('rooms').doc(publicID);
      const connectionsRef = roomRef.collection('connections');
      const targetConnectionRef = await connectionsRef.doc(connectionId);
      await targetConnectionRef.update(fileMeta);
    }
  }

  async function sendData() {
    const fileInput = document.getElementById(`fileInput-${targetPeer.id}`) as HTMLInputElement;
    const file = fileInput!.files && fileInput!.files[0];
    if (!file) return;
    console.log(`File is ${[file.name, file.size, file.type].join(' ')}`);
    if (file.size === 0) {
      console.log('File is empty, please select a non-empty file');
      closeDataChannels();
      return;
    }

    const chunkSize = 16384;
    let offset = 0;

    sentFileReaderRef.current = new FileReader();

    sentFileReaderRef.current.addEventListener('error', (error) => console.error('Error reading file:', error));
    sentFileReaderRef.current.addEventListener('abort', (event) => console.log('File reading aborted:', event));
    sentFileReaderRef.current.addEventListener('load', async (e) => {
      console.log('FileRead.onload ', e);
      let result = e!.target!.result as ArrayBuffer;

      (sendChannelRef.current as RTCDataChannel).send(result);
      offset += result.byteLength;

      setProgressPopperData({
        isOpen: true,
        progressType: 'send',
        fileProgress: Math.round((offset / file.size) * 100),
      });

      if (offset < file.size) {
        readSlice(offset);
      } else {
        console.log('done');
        setProgressPopperData({
          isOpen: false,
          progressType: null,
          fileProgress: 0,
        });
      }
    });
    const readSlice = (o: number) => {
      console.log('readSlice ', o);
      const slice = file.slice(offset, o + chunkSize);
      sentFileReaderRef.current!.readAsArrayBuffer(slice);
    };
    readSlice(0);
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

  async function promptsIncomingFileTransferPopper(fileMeta: IFileMeta, connectionId: string) {
    console.log('incoming file meta:', fileMeta);
    console.log('got from:', targetPeer);

    connectionIdRef.current = connectionId;
    setNotifyPopperOfferData({isOpen: true, fileMeta});
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

  async function onRejectFileTransfer() {
    closeDataChannels();
  }

  useEffect(() => {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(publicID);
    const connectionRef = roomRef.collection('connections');

    const unsubscribe = connectionRef.onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        let data = change.doc.data();
        if (change.type === 'added') {
          console.log(`Got new connection: ${JSON.stringify(data)}`);
        }
        if (change.type === 'modified') {
          const {isAccepting} = data.fileMeta as IFileMeta;
          if (
            data.p2p &&
            data.fileMeta &&
            !data.answer &&
            data.p2p.answer === localID &&
            data.p2p.offer === targetPeer.id
          ) {
            if (!isAccepting) {
              promptsIncomingFileTransferPopper(data.fileMeta, change.doc.id);
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

  function createReceiveDataChannel() {
    peerConnectionRef.current!.ondatachannel = receiveChannelCallback;
    const id = connectionIdRef.current as string;

    let completeFlag = 0;
    let receivedSize = 0;
    let receiveBuffer: ArrayBuffer[] = [];
    let downloadAnchor = document.createElement('a');

    function receiveChannelCallback(event: RTCDataChannelEvent) {
      console.log('Receive Channel Callback');
      receiveChannelRef.current = event.channel;
      receiveChannelRef.current.binaryType = 'arraybuffer';
      receiveChannelRef.current.onmessage = onReceiveMessageCallback;
      receiveChannelRef.current.onopen = onReceiveChannelStateChange;
      receiveChannelRef.current.onclose = onReceiveChannelStateChange;
    }

    async function onReceiveMessageCallback(event: MessageEvent<ArrayBuffer>) {
      console.log(`Received Message ${event.data.byteLength}`);
      console.log(event.data);
      receiveBuffer.push(event.data);

      const db = firebase.firestore();
      const roomRef = db.collection('rooms').doc(publicID);
      const connectionRef = roomRef.collection('connections').doc(id);
      const connectionSnapShot = await connectionRef.get();

      if (!connectionSnapShot.data()) return;

      const fileMeta = connectionSnapShot.data()!.fileMeta as IFileMeta;
      const {name, size} = fileMeta;

      receivedSize += event.data.byteLength;
      let receivedValue = Math.round((receivedSize / size) * 100);

      setProgressPopperData({
        isOpen: true,
        progressType: 'receive',
        fileProgress: receivedValue,
      });

      if (receivedSize === size && completeFlag === 0) {
        setProgressPopperData({
          isOpen: false,
          progressType: null,
          fileProgress: 0,
        });

        completeFlag = 1;
        const received = new Blob(receiveBuffer);
        receiveBuffer = [];

        console.log(received);
        console.log(name, size);

        // TODO-sprint: show download ready than automatically download?
        // downloadAnchor.textContent = '';
        let url = URL.createObjectURL(received);
        downloadAnchor.href = URL.createObjectURL(received);
        downloadAnchor.download = name;
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
        window.URL.revokeObjectURL(url);
        // downloadAnchor.textContent =
        //   `Click to download '${name}' (${size} bytes)`;

        completeFlag = 0;
        receivedSize = 0;

        closeDataChannels();
      }
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
          receiveChannelRef.current.close();
          receiveChannelRef.current = null;
        }
      }
    }
  }

  function createSendDataChannel() {
    sendChannelRef.current = peerConnectionRef.current!.createDataChannel('sendDataChannel');
    sendChannelRef.current.binaryType = 'arraybuffer';
    console.log('Created send data channel: ', sendChannelRef.current);

    function onSendChannelStateChange() {
      console.log('send channel:');
      console.log(sendChannelRef.current);
      if (sendChannelRef.current) {
        const {readyState} = sendChannelRef.current;
        console.log(`Send channel state is: ${readyState}`);

        if (readyState === 'open') {
          sendData();
          setWaitResponsePopperData({
            gotRemoteDesc: false,
            isOpen: false,
          });
        }

        if (readyState === 'closed') {
          sendChannelRef.current.close();
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
    sendChannelRef.current.onopen = onSendChannelStateChange;
    sendChannelRef.current.onclose = onSendChannelStateChange;
    sendChannelRef.current.onerror = onError;
  }

  const joinFileChannel = async (connectionID: string) => {
    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').doc(publicID);
    const connectionRef = roomRef.collection('connections').doc(connectionID);
    const connectionSnapshot = await connectionRef.get();

    if (connectionSnapshot.exists) {
      connectionIdRef.current = connectionID;
      peerConnectionRef.current = new RTCPeerConnection(pcConfig);

      console.log(connectionSnapshot.data());

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
      const fileMeta = connectionSnapshot!.data()!.fileMeta;
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
        fileMeta: {
          ...fileMeta,
          isAccepting: true,
        },
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
    const targetConnectionRef = await connectionsRef.doc();

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
      <Button ref={anchorRef} color="primary" variant="contained" component="label">
        {targetPeer.emoji}
        <input
          type="file"
          name="peer-file"
          id={`fileInput-${targetPeer.id}`}
          hidden
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => handleFileInputChange(e, targetPeer)}
        />
      </Button>

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
          onRejectFileTransfer={onRejectFileTransfer}
          progressType={progressPopperData.progressType}
          targetPeer={targetPeer}
          setClose={() => setProgressPopperData({...progressPopperData, isOpen: false})}
          anchorElement={anchorElement}
        />
      )}

      {notifyOfferPopperData.isOpen && (
        <NotifyOfferPopper
          isOpen={notifyOfferPopperData.isOpen}
          fileMeta={notifyOfferPopperData.fileMeta}
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
