import {useRef, useCallback} from 'react';
import firebase from 'src/services/firebase';
import {IPeerField} from 'src/types';
import {CALLEE, CALLER, CONNECTIONS, ROOT_COLLECTION} from 'src/constants';
import pcConfig from 'src/utils/pcConfig';
import {WaitResponsePopperReducerAction} from 'src/components/Poppers/WaitResponsePopper';

interface Props {
  localID: string;
  publicID: string;
  firestoreDbRef: firebase.firestore.Firestore;
  connectionIdRef: React.MutableRefObject<string | null>;
  peerConnectionRef: React.MutableRefObject<RTCPeerConnection | null>;
  calleeUnsubscriberRef: React.MutableRefObject<(() => void) | undefined>;
  descriptionUnsubscriberRef: React.MutableRefObject<(() => void) | undefined>;
  dispatchWaitResponsePopperData: (value: WaitResponsePopperReducerAction) => void;
  sendFileData: () => Promise<void>;
}

const useCreateTransferChannel = ({
  localID,
  publicID,
  firestoreDbRef,
  connectionIdRef,
  peerConnectionRef,
  calleeUnsubscriberRef,
  descriptionUnsubscriberRef,
  dispatchWaitResponsePopperData,
  sendFileData,
}: Props) => {
  const sendChannelRef = useRef<RTCDataChannel | null>(null);

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
  }, [peerConnectionRef, sendChannelRef, sendFileData, dispatchWaitResponsePopperData]);

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

  return {
    sendChannelRef,
    tryCreatePeerConnection,
  };
};

export default useCreateTransferChannel;
