/* eslint-disable */
mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));

// DEfault configuration - Change these if you have a different STUN or TURN server.
const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

let peerConnection = null;
let roomDialog = null;
let roomId = null;

let externalIP = null;

function determineIps() {
  const pc = new RTCPeerConnection(configuration);
  pc.createDataChannel('');
  pc.createOffer().then(offer => pc.setLocalDescription(offer))
  pc.onicecandidate = (ice) => {
    if (!ice || !ice.candidate || !ice.candidate.candidate) {
      pc.close();   
      console.log("closed");
      return;
    }
    let split = ice.candidate.candidate.split(" ");
    if (split[7] === "host") {
      console.log(`Local IP : ${split[4]}`);
    } else {
      console.log(`External IP : ${split[4]}`);
      externalIP = `${split[4]}`;
    }
  };
}

function init() {
  document.querySelector('#hangupBtn').addEventListener('click', clear);
  document.querySelector('#createBtn').addEventListener('click', createFileConnection);
  document.querySelector('#joinBtn').addEventListener('click', joinRoom);
  determineIps();
  roomDialog = new mdc.dialog.MDCDialog(document.querySelector('#room-dialog'));
}

function createSendDataChannel() {
  sendChannel = peerConnection.createDataChannel('sendDataChannel');
  sendChannel.binaryType = 'arraybuffer';
  console.log('Created send data channel: ', sendChannel);

  function onSendChannelStateChange() {
    if (sendChannel) {
      const {readyState} = sendChannel;
      console.log(`Send channel state is: ${readyState}`);
    }
  }
  
  function onError(error) {
    if (sendChannel) {
      console.error('Error in sendChannel:', error);
      return;
    }
    console.log('Error in sendChannel which is already closed:', error);
  }

  sendChannel.onopen = onSendChannelStateChange
  sendChannel.onclose = onSendChannelStateChange
  sendChannel.onerror = onError
}

function createReceiveDataChannel() {
  function receiveChannelCallback(event) {
    console.log('Receive Channel Callback');
    receiveChannel = event.channel;
    receiveChannel.binaryType = 'arraybuffer';
    receiveChannel.onmessage = onReceiveMessageCallback;
    receiveChannel.onopen = onReceiveChannelStateChange;
    receiveChannel.onclose = onReceiveChannelStateChange;
  
    receivedSize = 0;
  
    downloadAnchor.textContent = '';
    downloadAnchor.removeAttribute('download');
    if (downloadAnchor.href) {
      URL.revokeObjectURL(downloadAnchor.href);
      downloadAnchor.removeAttribute('href');
    }
  }
  
  async function onReceiveMessageCallback(event) {
    if (!timestampStart) timestampStart = (new Date()).getTime();

    console.log(`Received Message ${event.data.byteLength}`);
    console.log(event.data)
    receiveBuffer.push(event.data);
    receivedSize += event.data.byteLength;
    receiveProgress.value = receivedSize;
  
    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').doc(roomId);
    const roomSnapshot = await roomRef.get();
    const fileMeta = roomSnapshot.data().fileMeta;
  
    console.log(fileMeta, !!completeFlag)
  
    const {
      name,
      size,
      type,
    } = fileMeta
  
    // we are assuming that our signaling protocol told
    // about the expected file size (and name, hash, etc).
    // const file = fileInput.files[0];

    if (receivedSize === size && completeFlag === 0) {
      completeFlag = 1
      const received = new Blob(receiveBuffer);
      receiveBuffer = [];
  
      console.log(received)
      console.log(name, size)
  
      downloadAnchor.textContent = '';
  
      downloadAnchor.href = URL.createObjectURL(received);
      downloadAnchor.download = name;
      downloadAnchor.textContent =
        `Click to download '${name}' (${size} bytes)`;
      downloadAnchor.style.display = 'block';
  
      const bitrate = Math.round(receivedSize * 8 /
        ((new Date()).getTime() - timestampStart));
  
      bitrateDiv.innerHTML =
        `<strong>Average Bitrate:</strong> ${bitrate} kbits/sec`;
  
      completeFlag = 0
      receivedSize = 0
      timestampStart = 0
    }
  }
  
  async function onReceiveChannelStateChange() {
    if (receiveChannel) {
      const readyState = receiveChannel.readyState;
      console.log(`Receive channel state is: ${readyState}`);
    }
  }

  peerConnection.addEventListener('datachannel', receiveChannelCallback);
}

async function createFileConnection() {
  roomId = btoa(externalIP)

  document.querySelector('#joinBtn').disabled = true;

  sendFileButton.disabled = true;
  fileInput.disabled = false;

  const db = firebase.firestore();
  const roomRef = await db.collection('rooms').doc(roomId);

  console.log('Create PeerConnection with configuration: ', configuration);
  peerConnection = new RTCPeerConnection(configuration);

  registerPeerConnectionListeners();

  // Code for collecting ICE candidates below (in a nested custom collection)
  const callerCandidatesCollection = roomRef.collection('callerCandidates');

  createSendDataChannel();
  createReceiveDataChannel();

  peerConnection.addEventListener('icecandidate', event => {
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
    'offer': {
      type: offer.type,
      sdp: offer.sdp,
    },
  };

  await roomRef.set(roomWithOffer);
  console.log(`New room created with SDP offer. Room ID: ${roomId}`);
  
  document.querySelector(
      '#currentRoom').innerText = `Current room is ${roomId} - You are the room host!`;
  // Code for creating a room above

  // Listening for remote session description below
  roomRef.onSnapshot(async snapshot => {
    const data = snapshot.data();
    if (!peerConnection.currentRemoteDescription && data && data.answer) {
      console.log('Got remote description: ', data.answer);
      const rtcSessionDescription = new RTCSessionDescription(data.answer);
      await peerConnection.setRemoteDescription(rtcSessionDescription);
      // TODO: live update remote description
      sendFileButton.disabled = false;
    }
  });
  // Listening for remote session description above

  // Listen for remote ICE candidates below
  roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === 'added') {
        let data = change.doc.data();
        console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  // Listen for remote ICE candidates above
}

async function joinFileChannel(roomId) {
  const db = firebase.firestore();
  const roomRef = await db.collection('rooms').doc(`${roomId}`);
  const roomSnapshot = await roomRef.get();
  console.log('Got room:', roomSnapshot.exists);

  if (roomSnapshot.exists) {
    console.log('Create PeerConnection with configuration: ', configuration);
    peerConnection = new RTCPeerConnection(configuration);
    registerPeerConnectionListeners();
    
    // Code for collecting ICE candidates below
    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    
    peerConnection.addEventListener('icecandidate', event => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      calleeCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for collecting ICE candidates above

    createSendDataChannel();
    createReceiveDataChannel();

    // Code for creating SDP answer below
    const offer = roomSnapshot.data().offer;
    console.log('Got offer:', offer);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    console.log('Created answer:', answer);
    await peerConnection.setLocalDescription(answer);

    sendFileButton.disabled = false;

    const roomWithAnswer = {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    };
    await roomRef.update(roomWithAnswer);
    // Code for creating SDP answer above

    // Listening for remote ICE candidates below
    roomRef.collection('callerCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listening for remote ICE candidates above
  }
}

function joinRoom() {
  document.querySelector('#confirmJoinBtn').
      addEventListener('click', async () => {
        roomId = document.querySelector('#room-id').value;
        console.log('Join room: ', roomId);
        document.querySelector(
            '#currentRoom').innerText = `Current room is ${roomId} - You are the callee!`;
        await joinFileChannel(roomId);

        document.querySelector('#createBtn').disabled = true;
        fileInput.disabled = false;

      }, {once: true});

  roomDialog.open();
}

async function clear(e) {
  if (peerConnection) {
    peerConnection.close();
  }
  // Delete room on hangup
  if (roomId) {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(`${roomId}`);
    const calleeCandidates = await roomRef.collection('calleeCandidates').get();
    calleeCandidates.forEach(async candidate => {
      await candidate.ref.delete();
    });
    const callerCandidates = await roomRef.collection('callerCandidates').get();
    callerCandidates.forEach(async candidate => {
      await candidate.ref.delete();
    });
    await roomRef.delete();
  }

  document.location.reload(true);
}

function registerPeerConnectionListeners() {
  peerConnection.addEventListener('icegatheringstatechange', () => {
    console.log(
        `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
  });

  peerConnection.addEventListener('connectionstatechange', () => {
    console.log(`Connection state change: ${peerConnection.connectionState}`);
  });

  peerConnection.addEventListener('signalingstatechange', () => {
    console.log(`Signaling state change: ${peerConnection.signalingState}`);
  });

  peerConnection.addEventListener('iceconnectionstatechange ', () => {
    console.log(
        `ICE connection state change: ${peerConnection.iceConnectionState}`);
  });
}

/* eslint no-unused-expressions: 0 */
/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

let sendChannel;
let receiveChannel;
let fileReader;

const bitrateDiv = document.querySelector('div#bitrate');
const fileInput = document.querySelector('input#fileInput');
const abortButton = document.querySelector('button#abortButton');
const downloadAnchor = document.querySelector('a#download');
const sendProgress = document.querySelector('progress#sendProgress');
const receiveProgress = document.querySelector('progress#receiveProgress');
const statusMessage = document.querySelector('span#status');
const sendFileButton = document.querySelector('button#sendFile');

let receiveBuffer = [];
let receivedSize = 0;

let timestampStart;

let completeFlag = 0;

sendFileButton.addEventListener('click', () => {
  sendData()
  abortButton.disabled = false;
});

fileInput.addEventListener('change', handleFileInputChange, false);

abortButton.addEventListener('click', () => {
  if (fileReader && fileReader.readyState === 1) {
    console.log('Abort read!');
    fileReader.abort();
  }
});

async function handleFileInputChange() {
  const file = fileInput.files[0];

  if (!file) {
    console.log('No file chosen');
  } else {
    console.log(roomId)

    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').doc(`${roomId}`);
  
    const fileMeta = {
      'fileMeta': {
        name: file.name,
        size: file.size,
        type: file.type,
      },
    };

    await roomRef.update(fileMeta);
  }
}

async function sendData() {
  if (!timestampStart) timestampStart = (new Date()).getTime();

  const file = fileInput.files[0];
  console.log(`File is ${[file.name, file.size, file.type].join(' ')}`, `with room ${roomId}`);

  // Handle 0 size files.
  statusMessage.textContent = '';
  downloadAnchor.textContent = '';
  if (file.size === 0) {
    bitrateDiv.innerHTML = '';
    statusMessage.textContent = 'File is empty, please select a non-empty file';
    closeDataChannels();
    return;
  }
  sendProgress.max = file.size;
  receiveProgress.max = file.size;
  const chunkSize = 16384;
  fileReader = new FileReader();
  let offset = 0;
  fileReader.addEventListener('error', error => console.error('Error reading file:', error));
  fileReader.addEventListener('abort', event => console.log('File reading aborted:', event));
  fileReader.addEventListener('load', e => {
    console.log('FileRead.onload ', e);
    sendChannel.send(e.target.result);
    offset += e.target.result.byteLength;
    sendProgress.value = offset;
    if (offset < file.size) {
      readSlice(offset);
    } else {
      console.log('done')

      const bitrate = Math.round(file.size * 8 /
        ((new Date()).getTime() - timestampStart));
      
      bitrateDiv.innerHTML =
        `<strong>Average Bitrate:</strong> ${bitrate} kbits/sec`;
  
      timestampStart = 0
    }
  });
  const readSlice = o => {
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
    sendChannel = null;
  }

  if (receiveChannel) {
    receiveChannel.close();
    console.log(`Closed data channel with label: ${receiveChannel.label}`);
    receiveChannel = null;
  }

  clear()
}

init();
