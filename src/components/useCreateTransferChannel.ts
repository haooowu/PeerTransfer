import {useRef, useCallback} from 'react';
import firebase from 'src/services/firebase';
import {IPeerField} from 'src/types';
import {CALLEE, CALLER, CONNECTIONS, MAXIMUM_BUFFER_BYTE, MIN_CHUNK_SIZE, ROOT_COLLECTION} from 'src/constants';
import pcConfig from 'src/utils/pcConfig';
import {toast} from 'react-toastify';
import {WaitResponsePopperReducerAction} from 'src/components/Poppers/WaitResponsePopper';
import {ProgressPopperReducerAction} from './Poppers/ProgressPopper';

interface Props {
  localID: string;
  publicID: string;
  firestoreDbRef: firebase.firestore.Firestore;
  connectionIdRef: React.MutableRefObject<string | null>;
  peerConnectionRef: React.MutableRefObject<RTCPeerConnection | null>;
  calleeUnsubscriberRef: React.MutableRefObject<(() => void) | undefined>;
  descriptionUnsubscriberRef: React.MutableRefObject<(() => void) | undefined>;
  sentFileReaderRef: React.MutableRefObject<FileReader | null>;
  totalFileSizeRef: React.MutableRefObject<number>;
  acceptedFileListRef: React.MutableRefObject<File[]>;
  dispatchWaitResponsePopperData: (value: WaitResponsePopperReducerAction) => void;
  dispatchProgressPopperData: (value: ProgressPopperReducerAction) => void;
}

const useCreateTransferChannel = ({
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
  dispatchWaitResponsePopperData,
  dispatchProgressPopperData,
}: Props) => {
  const sendChannelRef = useRef<RTCDataChannel | null>(null);

  const sendFileData = useCallback(async () => {
    if (!acceptedFileListRef.current || acceptedFileListRef.current.length === 0) return;
    console.log(`Sending files:`, acceptedFileListRef.current);

    const files = [...acceptedFileListRef.current];

    const maxMessageSize = peerConnectionRef.current?.sctp?.maxMessageSize;
    console.log('maximum message size is: ', maxMessageSize);

    const chunkSize = maxMessageSize || MIN_CHUNK_SIZE;
    let singularOffset = 0; // total byte sent for single file
    let targetFileIndex = 0;
    let totalOffset = 0; // sum byte sent for all files

    function onTransferSuccess() {
      toast.success('File has been transferred');
      singularOffset = 0;
      targetFileIndex = 0;
      totalOffset = 0;
      dispatchProgressPopperData({type: 'clear'});
      acceptedFileListRef.current = [];
    }

    sentFileReaderRef.current = new FileReader();
    sentFileReaderRef.current.addEventListener('error', (error) => {
      console.error('Error reading file:', error);
      toast.error(`Failed to read file: ${files[targetFileIndex].name}`);
    });
    sentFileReaderRef.current.addEventListener('abort', (event) => {
      console.log('File reading aborted:', event);
      toast.warn(`Abort file read: ${files[targetFileIndex].name}`);
    });
    sentFileReaderRef.current.addEventListener('load', (event) => {
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
          // bug: maxMessageSize unstable for chromium buffer
          if ((sendChannelRef.current as RTCDataChannel).bufferedAmount + result.byteLength < MAXIMUM_BUFFER_BYTE) {
            readSlice(singularOffset);
          } else {
            // wait until buffer is not full
            setTimeout(checkBufferAmount, 500);
          }
        })();
      } else {
        console.log('transfer done');
        onTransferSuccess();
      }
    });

    const readSlice = (o: number) => {
      // console.log(`read ${files[targetFileIndex].name} slice `, o);
      // console.log('total fileChunks', totalOffset);

      let slice: Blob;

      // If still transfer current index file
      if (o < files[targetFileIndex].size) {
        let nextChunk: number = o + chunkSize;
        // when total chunk + next slice is exceeding the file, set next Chunk at the file size for complete current index's file
        if (nextChunk > files[targetFileIndex].size) nextChunk = files[targetFileIndex].size;
        // continue next slice chunk
        slice = files[targetFileIndex].slice(singularOffset, nextChunk);
      } else {
        // Else reset total byte sent for single file, move on to next file
        targetFileIndex += 1;
        singularOffset = 0;
        if (!files[targetFileIndex]) {
          // done
          onTransferSuccess();
          return;
        }
        // slice next file
        slice = files[targetFileIndex].slice(singularOffset, chunkSize);
      }
      // load target slice
      sentFileReaderRef.current!.readAsArrayBuffer(slice);
    };

    // begin slice files for transfer
    readSlice(0);
  }, [
    sendChannelRef,
    totalFileSizeRef,
    sentFileReaderRef,
    acceptedFileListRef,
    peerConnectionRef,
    dispatchProgressPopperData,
  ]);

  const createSendDataChannel = useCallback(() => {
    sendChannelRef.current = peerConnectionRef.current!.createDataChannel('sendDataChannel');
    console.log('Created send data channel: ', sendChannelRef.current);

    sendChannelRef.current.binaryType = 'arraybuffer';
    sendChannelRef.current.onopen = onSendChannelStateChange;
    sendChannelRef.current.onclose = onSendChannelStateChange;
    sendChannelRef.current.onerror = onError;

    function onSendChannelStateChange() {
      // console.log('send channel: ',sendChannelRef.current);
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
    // console.log('created pc', peerConnectionRef.current);
    connectionIdRef.current = targetConnectionRef.id;

    // set up send data channel and listeners
    createSendDataChannel();

    peerConnectionRef.current.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      // console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    });

    // Creating a room with offer sdp and update remote
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

    // Listening for remote session description
    const descriptionUnsubscriber = targetConnectionRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!data || !data.answer) return;
      if (peerConnectionRef.current && !peerConnectionRef.current!.currentRemoteDescription) {
        // console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnectionRef.current!.setRemoteDescription(rtcSessionDescription);

        dispatchWaitResponsePopperData({type: 'set_desc'});
      }
    });
    descriptionUnsubscriberRef.current = descriptionUnsubscriber;

    // Listen for remote ICE candidates
    const calleeUnsubscriber = targetConnectionRef.collection(CALLEE).onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          // console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnectionRef.current!.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    calleeUnsubscriberRef.current = calleeUnsubscriber;

    dispatchWaitResponsePopperData({type: 'set_open_without_desc'});
  };

  return {
    sendChannelRef,
    tryCreatePeerConnection,
  };
};

export default useCreateTransferChannel;
