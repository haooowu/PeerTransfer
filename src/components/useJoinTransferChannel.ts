import {useRef, useCallback} from 'react';
import firebase from 'src/services/firebase';
import {CALLEE, CALLER, CONNECTIONS, ROOT_COLLECTION} from 'src/constants';
import {IFileMeta} from 'src/types';
import {toast} from 'react-toastify';
import pcConfig from 'src/services/rtcPeerConnectionConfig';
import {ProgressPopperReducerAction} from './Poppers/ProgressPopper';
import {WaitResponsePopperReducerAction} from './Poppers/WaitResponsePopper';

interface Props {
  publicID: string;
  firestoreDbRef: firebase.firestore.Firestore;
  connectionIdRef: React.MutableRefObject<string | null>;
  peerConnectionRef: React.MutableRefObject<RTCPeerConnection | null>;
  callerUnsubscriberRef: React.MutableRefObject<(() => void) | undefined>;
  dispatchProgressPopperData: (value: ProgressPopperReducerAction) => void;
  dispatchWaitResponsePopperData: (value: WaitResponsePopperReducerAction) => void;
  handleDownloadFile: (receivedBlob: Blob, name: string) => void;
  clearSignalService: () => Promise<void>;
}

const useJoinTransferChannel = ({
  publicID,
  firestoreDbRef,
  connectionIdRef,
  peerConnectionRef,
  callerUnsubscriberRef,
  dispatchProgressPopperData,
  dispatchWaitResponsePopperData,
  handleDownloadFile,
  clearSignalService,
}: Props) => {
  const receiveChannelRef = useRef<RTCDataChannel | null>(null);

  const closeReceiveDataChannel = useCallback(() => {
    dispatchWaitResponsePopperData({type: 'clear'});
    if (receiveChannelRef.current) {
      receiveChannelRef.current.close();
      console.log(`Closed receive data channel with label: ${receiveChannelRef.current.label}`);
    }
    clearSignalService();
  }, [receiveChannelRef, dispatchWaitResponsePopperData, clearSignalService]);

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

      // console.log(`Received Message ${event.data.byteLength}`);
      // console.log(event.data);

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
        closeReceiveDataChannel();
      }
    }

    async function onReceiveChannelStateChange() {
      // console.log(receiveChannelRef.current);
      // console.log(receiveChannelRef.current);
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
  }, [
    connectionIdRef,
    firestoreDbRef,
    peerConnectionRef,
    receiveChannelRef,
    publicID,
    dispatchProgressPopperData,
    dispatchWaitResponsePopperData,
    handleDownloadFile,
    closeReceiveDataChannel,
  ]);

  const joinTransferChannel = async (connectionID: string) => {
    const roomRef = firestoreDbRef.collection(ROOT_COLLECTION).doc(publicID);
    const connectionRef = roomRef.collection(CONNECTIONS).doc(connectionID);
    const connectionSnapshot = await connectionRef.get();

    if (connectionSnapshot.exists) {
      connectionIdRef.current = connectionID;
      peerConnectionRef.current = new RTCPeerConnection(pcConfig);

      // set up receive data channel and listeners
      createReceiveDataChannel();

      // Code for collecting ICE candidates
      const calleeCandidatesCollection = connectionRef.collection(CALLEE);
      peerConnectionRef.current.addEventListener('icecandidate', (event) => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        // console.log('Got candidate: ', event.candidate);
        calleeCandidatesCollection.add(event.candidate.toJSON());
      });

      // Listening for remote ICE candidates
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
      callerUnsubscriberRef.current = calllerUnsubscriber;

      // Creating SDP answer and update remote
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
      connectionRef.update(roomWithAnswer);
    }
  };

  return {
    receiveChannelRef,
    joinTransferChannel,
  };
};

export default useJoinTransferChannel;
