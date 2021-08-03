import React, {useState, useEffect, useLayoutEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';

import getRandomFaceEmoji from 'src/utils/getRandomFaceEmoji';
import detectOS from 'src/utils/detectOS';

import {CircularProgress} from '@material-ui/core';
import backgroundRipple from 'src/assets/backgroundRipple.svg';

import {useGesture} from 'react-use-gesture';
import {IdentityContext, IIdentityContextVariable} from 'src/providers/IdentityProvider';
import PeersListener from 'src/components/PeersListener';
import SideDrawer from 'src/components/SideDrawer';
import {IPeerField} from 'src/types';

import {toast} from 'react-toastify';
import {DATA_CHANNEL_TIMEOUT, ELE_PUBLIC_ID, ELE_PUBLIC_ID_WRAPPER} from 'src/constants';

const Loader = styled(CircularProgress)``;

const RippleHolder = styled.div`
  position: absolute;
  bottom: 0;
  background-image: url(${backgroundRipple});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  width: 100%;
  height: 100%;
  max-height: 1600px;
`;

const LoadingWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.primary.main};
  height: 100%;
  min-height: 100%;
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

const Wrapper = styled(LoadingWrapper)`
  margin-left: ${(props) => props.theme.drawerMinWidth};
  z-index: 10;
  p,
  button,
  label {
    z-index: 1;
  }
`;

interface Props {
  localID: string;
  publicID: string;
}

const ConsumedIdentityLayout: React.FC<Props> = ({publicID, localID}) => {
  const [selfIdentity, setSelfIdentity] = useState<IPeerField | null>();
  const [gestureDirection, setGestureDirection] = useState<'left' | 'right' | undefined>();

  useEffect(() => {
    const initPeers = () => {
      const presenceDB = firebase.database();
      const identity = {
        id: localID,
        emoji: `${getRandomFaceEmoji()}`,
        ...detectOS(),
      } as IPeerField;

      let presenceRef = presenceDB.ref(`${publicID}/${localID}`);

      presenceRef.set(identity);
      presenceRef.onDisconnect().remove();
      setSelfIdentity(identity);
    };

    initPeers();
  }, [localID, publicID]);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(DATA_CHANNEL_TIMEOUT)) {
      toast(
        <div>
          Failed to establish data transfer channel, please try again
          <br />
          <sub>Note: data transfer between Apple and Windows devices currently not working</sub>
        </div>,
        {
          autoClose: false,
          type: 'warning',
        },
      );
      sessionStorage.removeItem(DATA_CHANNEL_TIMEOUT);
    }
  }, []);

  const bind = useGesture({
    onDragEnd: (state) => {
      if (
        state.event.target === document.getElementById(ELE_PUBLIC_ID) ||
        state.event.target === document.getElementById(ELE_PUBLIC_ID_WRAPPER)
      )
        return;
      let movementX = Math.sign(state.movement[0]);
      let movementY = Math.sign(state.movement[1]);
      let distanceX = Math.abs(state.movement[0]);
      if (distanceX > 8) {
        if (movementX === -1) setGestureDirection('left');
        if (movementX === 1) setGestureDirection('right');
      }
      if (movementX === 0 && movementY === 0) setGestureDirection(undefined);
    },
  });

  return (
    <Wrapper {...bind()}>
      <SideDrawer gestureDirection={gestureDirection} />
      <PeersListener selfIdentity={selfIdentity} publicID={publicID} localID={localID} />
      <RippleHolder />
    </Wrapper>
  );
};

const IdentityLayout = () => (
  <IdentityContext.Consumer>
    {({localID, publicID}: IIdentityContextVariable) =>
      localID && publicID ? (
        <ConsumedIdentityLayout localID={localID} publicID={publicID} />
      ) : (
        <LoadingWrapper>
          <Loader color="secondary" />
        </LoadingWrapper>
      )
    }
  </IdentityContext.Consumer>
);

export default IdentityLayout;
