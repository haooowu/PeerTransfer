import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

import {IFileMeta, IPeerField} from 'src/types';
import pcConfig from 'src/utils/pcConfig';

const Wrapper = styled.div`
  position: absolute;
  bottom: 1em;
`;

interface Props {
  selfIdentity: IPeerField;
  localID: string;
  publicID: string;
}

// TODO-sprint: UI to prompts received filed progress
// onAccept: ...
// onDecline: ...

const SelfConnectionHolder: React.FC<Props> = ({selfIdentity, localID, publicID}) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [connectionId, setConnectionId] = useState<string>();
  const [sendChannel, setSendChannel] = useState<RTCDataChannel | null>(null);
  const [receiveChannel, setReceiveChannel] = useState<RTCDataChannel | null>(null);

  useEffect(() => {
    // const db = firebase.firestore();
    // const roomRef = db.collection('rooms').doc(publicID);
    // const connectionRef = roomRef.collection('connections')

    // connectionRef.onSnapshot(async (snapshot) => {
    //   snapshot.docChanges().forEach(async (change) => {
    //     if (change.type === 'modified') return;
    //     if (change.type === 'removed') return;
    //     if (change.type === 'added') {
    //       let data = change.doc.data();
    //       console.log(`Got new connection: ${JSON.stringify(data)}`);
    //     }
    //   });
    // });

    return () => {
      // TODO-sprint: close connection and delete the document
    };
  }, []);

  return (
    <Wrapper>
      <Button color="primary" variant="contained" disableTouchRipple>
        You: {selfIdentity?.emoji}
      </Button>
      <div>Test</div>
    </Wrapper>
  );
};

export default SelfConnectionHolder;
