import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';

import pcConfig from 'src/utils/pcConfig';
import getRandomFaceEmoji from 'src/utils/getRandomFaceEmoji';
import detectOS from 'src/utils/detectOS';

import {Button} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import backgroundRipple from 'src/assets/backgroundRipple.svg';

import {IdentityContext, IIdentityContextVariable} from 'src/components/IdentityProvider';

// https://material-ui.com/components/drawers/

const Loader = styled(CircularProgress)``;

const StyledP = styled.p``;

const RippleHolder = styled.div`
  position: absolute;
  bottom: 0;
  background-image: url(${backgroundRipple});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  width: 100%;
  max-width: 1200px;
  height: 600px;
  z-index: 1;
`;

const Wrapper = styled.div`
  position: relative;
  background-color: #303846;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

interface Props {
  localID: string;
  publicID: string;
}

const ConsumedHelloWorld: React.FC<Props> = ({publicID, localID}) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const initPeersInRoom = async () => {
      const db = firebase.firestore();
      const roomRef = await db.collection('rooms').doc(publicID);
      // const connections = roomRef.collection('connection');
      const peers = roomRef.collection('peers');
      await peers.doc(localID).set({
        id: localID,
        emoji: `${getRandomFaceEmoji()}`,
        ...detectOS(),
      });
    };
    initPeersInRoom();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <StyledP>Hello World</StyledP>
      <Button color="primary" variant="contained" disableTouchRipple>
        Test
      </Button>
      <RippleHolder />
    </Wrapper>
  );
};

const HelloWorld = () => (
  <IdentityContext.Consumer>
    {({localID, publicID}: IIdentityContextVariable) =>
      localID && publicID ? <ConsumedHelloWorld localID={localID} publicID={publicID} /> : <Loader />
    }
  </IdentityContext.Consumer>
);

export default HelloWorld;
