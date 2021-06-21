import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import {
  Button,
  Popper,
  Typography,
  Paper,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import {IFileMeta, IPeerField} from 'src/types';
import usePopperStyles from 'src/styles/usePopperStyles';
import pcConfig from 'src/utils/pcConfig';
import WaitResponsePopper from './Poppers/WaitResponsePopper';

interface Props {
  targetPeer: IPeerField;
  localID: string;
  publicID: string;
}

// TODO-sprint: UI to abort fileReader transfer

// TODO-sprint: react-dropzone to wrap input

// TODO-sprint: if reject delete doc and all nested data

// TODO-sprint: join BY roomID, or join by listen to connectionIDs snapshot

// 1. receiver upon listen to connectionIDs snapshot, for every connection that p2p contains self,
//   and there is not yet both answer and offer created, show UI indicate fileMeta and UI to accept/decline
// - accept: add callee candidates collection, create answer
// - decline: delete the target connection document

// 2. offer end:
// - decline: upon listen to snapshot iff no such room, or manual cannel, close peerconnection
// - accept: upon got all answer from connectionId, send file Data

const PeerIdentifier: React.FC<Props> = ({targetPeer, localID, publicID}) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [connectionId, setConnectionId] = useState<string>();
  const [sendChannel, setSendChannel] = useState<RTCDataChannel | null>(null);
  const [receiveChannel, setReceiveChannel] = useState<RTCDataChannel | null>(null);

  const anchorRef = React.useRef(null);
  const [isOpen, setOpen] = React.useState(true);
  const [anchorElement, setAnchorElement] = React.useState(null);
  useEffect(() => {
    if (anchorRef.current) setAnchorElement(anchorRef.current);
  }, [anchorRef]);

  const [fileReader, setFileReader] = React.useState<FileReader>(new FileReader());

  function handleFileAbort() {
    if (fileReader && fileReader.readyState === 1) {
      console.log('Abort read!');
      fileReader.abort();
    }
  }

  async function handleFileInputChange() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const file = fileInput!.files ? fileInput.files[0] : null;

    if (!file) {
      console.log('No file chosen');
    } else {
      const fileMeta = {
        fileMeta: {
          name: file.name,
          size: file.size,
          type: file.type,
        },
      };
      // TODO-sprint: update fileMeta
      // await roomRef.update(fileMeta);
    }
  }

  async function sendData() {
    // TODO-sprint: peer id
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (!fileInput.files) return;
    const file = fileInput!.files[0];
    console.log(`File is ${[file.name, file.size, file.type].join(' ')}`);

    if (file.size === 0) {
      console.log('File is empty, please select a non-empty file');
      closeDataChannels();
      return;
    }

    // TODO-sprint: peer id
    const sendProgress = document.querySelector('progress#sendProgress') as HTMLProgressElement;
    const receiveProgress = document.querySelector('progress#receiveProgress') as HTMLProgressElement;
    sendProgress!.max = file.size;
    receiveProgress!.max = file.size;
    const chunkSize = 16384;

    let offset = 0;

    fileReader.addEventListener('error', (error) => console.error('Error reading file:', error));
    fileReader.addEventListener('abort', (event) => console.log('File reading aborted:', event));
    fileReader.addEventListener('load', (e) => {
      console.log('FileRead.onload ', e);
      let result = e!.target!.result as ArrayBuffer;
      sendChannel!.send(result);
      offset += result.byteLength;
      sendProgress.value = offset;
      if (offset < file.size) {
        readSlice(offset);
      } else {
        console.log('done');
      }
    });
    const readSlice = (o: number) => {
      console.log('readSlice ', o);
      const slice = file.slice(offset, o + chunkSize);
      fileReader.readAsArrayBuffer(slice);
    };
    readSlice(0);
  }

  function closeDataChannels() {
    console.log('Closing data channels');

    if (sendChannel) {
      sendChannel.close();
      console.log(`Closed data channel with label: ${sendChannel.label}`);
      setSendChannel(null);
    }

    if (receiveChannel) {
      receiveChannel.close();
      console.log(`Closed data channel with label: ${receiveChannel.label}`);
      setReceiveChannel(null);
    }
    clear('TODO-sprint: destroy');
  }

  async function clear(roomId: string) {
    if (peerConnection) {
      peerConnection.close();
    }
    // Delete room on hangup
    if (roomId) {
      const db = firebase.firestore();
      const roomRef = db.collection('rooms').doc(`${roomId}`);
      const calleeCandidates = await roomRef.collection('calleeCandidates').get();
      calleeCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidates = await roomRef.collection('callerCandidates').get();
      callerCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      await roomRef.delete();
    }

    document.location.reload(true);
  }

  useEffect(() => {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(publicID);
    const connectionRef = roomRef.collection('connections');

    const unsubscribe = connectionRef.onSnapshot(async (snapshot) => {
      const data = snapshot.size;

      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'modified') return;
        if (change.type === 'removed') return;
        if (change.type === 'added') {
          let data = change.doc.data();
          // TODO-sprint: if p2p[localID] exist
          // if (data.p2p && data.p2p[localID]) {
          //   joinFileChannel(change.doc.id)
          // }
          console.log(data.p2p);
          console.log(`Got new connection: ${JSON.stringify(data)}`);
        }
      });
    });

    return () => {
      // TODO-sprint: close connection and delete the document on peer presence drop
      unsubscribe();
    };
  }, []);

  /**
   * Receive Data Channel
   * TODO-sprint: chain promise
   * TODO-sprint: only create Receive when
   */
  function createReceiveDataChannel(pc: RTCPeerConnection, id: string) {
    pc.ondatachannel = receiveChannelCallback;

    let completeFlag = 0;
    let receiveChannel: RTCDataChannel;
    let receivedSize = 0;
    let receiveBuffer: ArrayBuffer[] = [];

    function receiveChannelCallback(event: RTCDataChannelEvent) {
      console.log('Receive Channel Callback');
      receiveChannel = event.channel;
      receiveChannel.binaryType = 'arraybuffer';
      receiveChannel.onmessage = onReceiveMessageCallback;
      receiveChannel.onopen = onReceiveChannelStateChange;
      receiveChannel.onclose = onReceiveChannelStateChange;

      receivedSize = 0;

      // TODO-sprint: remove previous received file + download file popper UI
      // downloadAnchor.textContent = '';
      // downloadAnchor.removeAttribute('download');
      // if (downloadAnchor.href) {
      //   URL.revokeObjectURL(downloadAnchor.href);
      //   downloadAnchor.removeAttribute('href');
      // }
    }

    async function onReceiveMessageCallback(event: MessageEvent<ArrayBuffer>) {
      console.log(`Received Message ${event.data.byteLength}`);
      console.log(event.data);
      receiveBuffer.push(event.data);

      // TODO-sprint: receive progress popper UI
      // receivedSize += event.data.byteLength;
      // receiveProgress.value = receivedSize;

      const db = firebase.firestore();
      const roomRef = db.collection('rooms').doc(publicID);
      const connectionRef = roomRef.collection('connections').doc(id);
      const connectionSnapShot = await connectionRef.get();

      if (!connectionSnapShot.data()) return;

      const fileMeta = connectionSnapShot.data()!.fileMeta as IFileMeta;
      const {name, size} = fileMeta;

      // we are assuming that our signaling protocol told
      // about the expected file size (and name, hash, etc).
      // const file = fileInput.files[0];

      if (receivedSize === size && completeFlag === 0) {
        completeFlag = 1;
        const received = new Blob(receiveBuffer);
        receiveBuffer = [];

        console.log(received);
        console.log(name, size);

        // TODO-sprint: download progress popper UI
        // downloadAnchor.textContent = '';
        // downloadAnchor.href = URL.createObjectURL(received);
        // downloadAnchor.download = name;
        // downloadAnchor.textContent =
        //   `Click to download '${name}' (${size} bytes)`;

        completeFlag = 0;
        receivedSize = 0;
      }
    }

    async function onReceiveChannelStateChange() {
      if (receiveChannel) {
        const readyState = receiveChannel.readyState;
        console.log(`Receive channel state is: ${readyState}`);
      }
    }
  }

  /**
   * TODO-sprint: chain promise
   * Send Data Channel
   */
  function createSendDataChannel(pc: RTCPeerConnection) {
    let sendChannel = pc.createDataChannel('sendDataChannel');
    sendChannel.binaryType = 'arraybuffer';
    console.log('Created send data channel: ', sendChannel);

    function onSendChannelStateChange() {
      if (sendChannel) {
        const {readyState} = sendChannel;
        console.log(`Send channel state is: ${readyState}`);
      }
    }
    function onError(errorEvent: RTCErrorEvent) {
      if (sendChannel) {
        console.error('Error in sendChannel:', errorEvent);
        return;
      }
      console.log('Error in sendChannel which is already closed:', errorEvent);
    }
    sendChannel.onopen = onSendChannelStateChange;
    sendChannel.onclose = onSendChannelStateChange;
    sendChannel.onerror = onError;
  }

  const joinFileChannel = async (connectionID: string) => {
    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').doc(publicID);
    const connectionRef = roomRef.collection('connections').doc(connectionID);
    const connectionSnapshot = await connectionRef.get();

    let peerConnection: RTCPeerConnection;

    if (connectionSnapshot.exists) {
      peerConnection = new RTCPeerConnection(pcConfig);

      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = roomRef.collection('calleeCandidates');

      peerConnection.addEventListener('icecandidate', (event) => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        calleeCandidatesCollection.add(event.candidate.toJSON());
      });
      // Code for collecting ICE candidates above

      // TODO-sprint: UI to accept connection

      // TODO-sprint:
      createSendDataChannel(peerConnection);
      createReceiveDataChannel(peerConnection, connectionID);

      // Code for creating SDP answer below
      const offer = connectionSnapshot!.data()!.offer;
      console.log('Got offer:', offer);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      console.log('Created answer:', answer);
      await peerConnection.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      };
      await roomRef.update(roomWithAnswer);
      // Code for creating SDP answer above

      // Listening for remote ICE candidates below
      roomRef.collection('callerCandidates').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            let data = change.doc.data();
            console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listening for remote ICE candidates above
    }
  };

  const tryCreatePeerConnection = async (e: React.MouseEvent<HTMLElement>, peer: IPeerField) => {
    e.preventDefault();
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(publicID);
    const connectionsRef = roomRef.collection('connections');
    const targetConnectionRef = await connectionsRef.doc();

    const p2pData = {
      p2p: {
        p1: localID,
        p2: peer.id,
      },
    };

    console.log('called');
    await targetConnectionRef.set(p2pData, {merge: true});
    setConnectionId(targetConnectionRef.id);

    const callerCandidatesCollection = targetConnectionRef.collection('callerCandidates');

    const peerConnection = new RTCPeerConnection(pcConfig);

    createSendDataChannel(peerConnection);
    createReceiveDataChannel(peerConnection, targetConnectionRef.id);

    peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for creating a room below
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('Created offer:', offer);

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    };

    await targetConnectionRef.set(roomWithOffer, {merge: true});
    // Listening for remote session description below
    targetConnectionRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    targetConnectionRef.collection('calleeCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above
  };

  return (
    <div>
      <Button
        ref={anchorRef}
        style={{
          marginTop: 20,
        }}
        color="primary"
        variant="contained"
        component="label"
        onClick={(e: React.MouseEvent<HTMLElement>) => tryCreatePeerConnection(e, targetPeer)}
      >
        {targetPeer.emoji}
        <input type="file" id="fileInput" name="files" hidden />
      </Button>

      <div>Progress</div>

      <WaitResponsePopper isOpen={isOpen} setOpen={setOpen} anchorElement={anchorElement} />
    </div>
  );
};

export default PeerIdentifier;
