import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

import {IFileMeta, IPeerField} from 'src/types';
import pcConfig from 'src/utils/pcConfig';

interface Props {
  targetPeer: IPeerField;
  localID: string;
  publicID: string;
}

// TODO-sprint: react-popper to contain all the UI

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

      // TODO-sprint: remove previous received file
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

      // TODO-sprint: receive progress UI
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

        // TODO-sprint: download UI
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

  const tryCreatePeerConnection = async (peer: IPeerField) => {
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
      <form id="fileInfo">
        <Button
          style={{
            marginTop: 20,
          }}
          color="primary"
          variant="contained"
          component="label"
          onClick={() => tryCreatePeerConnection(targetPeer)}
        >
          {targetPeer.emoji}
          <input type="file" id="fileInput" name="files" hidden />
        </Button>
      </form>
    </div>
  );
};

export default PeerIdentifier;
