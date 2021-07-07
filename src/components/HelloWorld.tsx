import React, {useState, useEffect, useLayoutEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';

import getRandomFaceEmoji from 'src/utils/getRandomFaceEmoji';
import detectOS from 'src/utils/detectOS';

import {CircularProgress} from '@material-ui/core';
import backgroundRipple from 'src/assets/backgroundRipple.svg';

import {IdentityContext, IIdentityContextVariable} from 'src/components/IdentityProvider';
import PeersListener from 'src/components/PeersListener';
import {IPeerField} from 'src/types';

// TODO-sprint: swipe detection and click-outside to close drawer
// TODO-sprint: organize theme with styled-components
// https://material-ui.com/components/drawers/
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import CloudIcon from '@material-ui/icons/CloudQueue';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import DesktopIcon from '@material-ui/icons/DesktopWindows';
import DesktopOffIcon from '@material-ui/icons/DesktopAccessDisabled';
import useDrawerStyles from 'src/styles/useDrawerStyles';

import {toast} from 'react-toastify';
import {DATA_CHANNEL_TIMEOUT} from 'src/constants';

const Loader = styled(CircularProgress)``;

const StyledP = styled.p`
  color: ${(props) => props.theme.primary.contrastText};
`;

const StyledIconButton = styled(IconButton)`
  width: ${(props) => props.theme.drawerMinWidth};
  height: ${(props) => props.theme.drawerMinWidth};
  color: ${(props) => props.theme.primary.contrastText} !important;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: ${(props) => props.theme.primary.contrastText} !important;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: ${(props) => props.theme.primary.light} !important;
    color: ${(props) => props.theme.primary.contrastText} !important;
  }
`;

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

const ConsumedHelloWorld: React.FC<Props> = ({publicID, localID}) => {
  const [selfIdentity, setSelfIdentity] = useState<IPeerField | null>();

  const classes = useDrawerStyles();
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

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

  return (
    <Wrapper>
      <StyledDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.titleBar}>
          {open && <div className={classes.titleText}>PeerTransfer</div>}
          <StyledIconButton disableRipple onClick={handleToggle}>
            {open ? <ArrowBackIcon /> : <MenuIcon />}
          </StyledIconButton>
        </div>
        <Divider />
        <List>
          {['Auto Accept Request', 'Auto Download Files'].map((text, index) => (
            <ListItem button key={text}>
              <StyledListItemIcon>{index % 2 === 0 ? <CloudIcon /> : <CloudOffIcon />}</StyledListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['Dark Mode', 'Light Mode'].map((text, index) => (
            <ListItem button key={text}>
              <StyledListItemIcon>{index % 2 === 0 ? <DesktopIcon /> : <DesktopOffIcon />}</StyledListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <StyledListItemIcon>
              <HelpIcon />
            </StyledListItemIcon>
            <ListItemText primary={'FAQ'} />
          </ListItem>
          <ListItem button>
            <StyledListItemIcon>
              <GitHubIcon />
            </StyledListItemIcon>
            <ListItemText primary={'Source'} />
          </ListItem>
          <ListItem button>
            <StyledListItemIcon>
              <AccountTreeIcon />
            </StyledListItemIcon>
            <ListItemText primary={'Join a room'} />
          </ListItem>
        </List>
      </StyledDrawer>

      <StyledP>Hello World</StyledP>
      <PeersListener selfIdentity={selfIdentity} publicID={publicID} localID={localID} />
      <RippleHolder />
    </Wrapper>
  );
};

const HelloWorld = () => (
  <IdentityContext.Consumer>
    {({localID, publicID}: IIdentityContextVariable) =>
      localID && publicID ? (
        <ConsumedHelloWorld localID={localID} publicID={publicID} />
      ) : (
        <LoadingWrapper>
          <Loader />
        </LoadingWrapper>
      )
    }
  </IdentityContext.Consumer>
);

export default HelloWorld;
