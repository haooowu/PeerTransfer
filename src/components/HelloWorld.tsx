import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';

import getRandomFaceEmoji from 'src/utils/getRandomFaceEmoji';
import detectOS from 'src/utils/detectOS';

import {CircularProgress} from '@material-ui/core';
import backgroundRipple from 'src/assets/backgroundRipple.svg';

import {IdentityContext, IIdentityContextVariable} from 'src/components/IdentityProvider';

import SelfConnectionHolder from 'src/components/SelfConnectionHolder';
import TimeoutAlert from 'src/components/TimeoutAlert';
import PeersListener from 'src/components/PeersListener';
import {IPeerField} from 'src/types';

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
  height: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  background-color: #303846;
  min-height: 100vh;
  max-width: 100vw;
  margin-left: 55px; // TODO-sprint: global css var
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
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

  return (
    <>
      <Wrapper>
        <Drawer
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
            <IconButton disableRipple className={classes.iconBtn} onClick={handleToggle}>
              {open ? <ArrowBackIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Auto Accept Request', 'Auto Download Files'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon className={classes.listItemIcon}>
                  {index % 2 === 0 ? <CloudIcon /> : <CloudOffIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            {['Dark Mode', 'Light Mode'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon className={classes.listItemIcon}>
                  {index % 2 === 0 ? <DesktopIcon /> : <DesktopOffIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary={'FAQ'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary={'Source'} />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.listItemIcon}>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary={'Join a room'} />
            </ListItem>
          </List>
        </Drawer>

        <StyledP>Hello World</StyledP>
        {selfIdentity && <SelfConnectionHolder publicID={publicID} localID={localID} selfIdentity={selfIdentity} />}
        <PeersListener publicID={publicID} localID={localID} />
        <RippleHolder />
      </Wrapper>

      <TimeoutAlert />
    </>
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
