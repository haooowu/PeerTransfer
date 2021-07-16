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
import {DATA_CHANNEL_TIMEOUT} from 'src/constants';

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
    const initPeers = async () => {
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
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(DATA_CHANNEL_TIMEOUT)) {
      toast.warn('Failed to create a stable data channel, please try again', {
        autoClose: false,
        position: 'top-center',
      });
      sessionStorage.removeItem(DATA_CHANNEL_TIMEOUT);
    }
  }, []);

  const bind = useGesture({
    onDragEnd: (state) => {
      let swipeX = state.swipe[0];
      let swipeY = state.swipe[1];
      if (swipeX === -1) setGestureDirection('left');
      if (swipeX === 1) setGestureDirection('right');
      if (swipeX === 0 && swipeY === 0) setGestureDirection(undefined);
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
          <Loader />
        </LoadingWrapper>
      )
    }
  </IdentityContext.Consumer>
);

export default IdentityLayout;
