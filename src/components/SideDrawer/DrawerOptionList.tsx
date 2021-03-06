import React from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {IdentityContext, IIdentityContextVariable} from 'src/providers/IdentityProvider';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GitHubIcon from '@material-ui/icons/GitHub';
import HelpIcon from '@material-ui/icons/Help';
import CloudIcon from '@material-ui/icons/CloudDownloadSharp';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import ChatIcon from '@material-ui/icons/Chat';
import ChatOffIcon from '@material-ui/icons/SpeakerNotesOff';
import LightBrightnessIcon from '@material-ui/icons/Brightness7';
import DarkBrightnessIcon from '@material-ui/icons/Brightness4';
import {IAppSettingContextVariable} from 'src/providers/AppSettingProvider';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {ELE_PUBLIC_ID, ELE_PUBLIC_ID_WRAPPER} from 'src/constants';

const StyledListItemIcon = styled(ListItemIcon)`
  margin-right: -16px;
  color: ${(props) => props.theme.primary.contrastText} !important;
`;

const StyledListItem = styled(ListItem)<{$isOpen: boolean}>`
  margin-top: 4px;
  justify-content: space-between !important;
  line-height: 1.5em;
  cursor: pointer;
  padding: 0.5em 1em;
  font-size: 14px;
  text-align: left;
  padding-bottom: 1em;
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  * {
    pointer-events: none;
  }
  span {
    font-weight: 300;
  }
  input {
    min-width: 200px;
    pointer-events: auto;
    color: ${(props) => props.theme.primary.contrastText};
  }
`;

const StyledList = styled(List)`
  margin-top: auto !important;
`;

interface Props extends IAppSettingContextVariable {
  drawerOpen: boolean;
  handleJoinRoomModalOpen: () => void;
  handleAboutModalOpen: () => void;
}

interface IDrawerOptionList extends Props {
  publicID: string;
}

const DrawerOptionList: React.FC<IDrawerOptionList> = ({
  publicID,
  drawerOpen,
  shouldAutoAccept,
  shouldAutoDownload,
  appTheme,
  toggleAutoAccept,
  toggleAutoDownload,
  toggleLightDarkTheme,
  handleJoinRoomModalOpen,
  handleAboutModalOpen,
}) => {
  const handleCopyPublicID = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(publicID);
      toast.dismiss();
      toast.info('Room Id copied', {
        autoClose: 3000,
      });
    } catch {
      (document.getElementById(ELE_PUBLIC_ID) as HTMLInputElement).select();
    }
  };

  const handleSourceRedirect = () => window.open('https://github.com/haooowu/PeerTransfer');

  return (
    <>
      <List>
        <Tooltip title={'Auto Accept'} placement="right">
          <ListItem button onClick={toggleAutoAccept}>
            <StyledListItemIcon>{shouldAutoAccept ? <ChatIcon /> : <ChatOffIcon />}</StyledListItemIcon>
            <ListItemText primary={'Auto Accept Request'} />
            <Switch checked={shouldAutoAccept} inputProps={{'aria-label': 'secondary checkbox'}} />
          </ListItem>
        </Tooltip>

        <Tooltip title={'Auto Download'} placement="right">
          <ListItem button onClick={toggleAutoDownload}>
            <StyledListItemIcon>{shouldAutoDownload ? <CloudIcon /> : <CloudOffIcon />}</StyledListItemIcon>
            <ListItemText primary={'Auto Download File'} />
            <Switch checked={shouldAutoDownload} inputProps={{'aria-label': 'secondary checkbox'}} />
          </ListItem>
        </Tooltip>
      </List>

      <Divider />

      <List>
        <Tooltip title="Brightness Theme" placement="right">
          <ListItem button onClick={toggleLightDarkTheme}>
            <StyledListItemIcon>
              {appTheme === 'light' ? <LightBrightnessIcon /> : <DarkBrightnessIcon />}
            </StyledListItemIcon>
            <ListItemText primary={'Light / Dark Theme'} />
          </ListItem>
        </Tooltip>
        <Tooltip title="Join Another Room" placement="right">
          <ListItem button onClick={handleJoinRoomModalOpen}>
            <StyledListItemIcon>
              <AccountTreeIcon />
            </StyledListItemIcon>
            <ListItemText primary={'Join a room'} />
          </ListItem>
        </Tooltip>
      </List>

      <Divider />

      <List>
        <StyledListItem button id={ELE_PUBLIC_ID_WRAPPER} $isOpen={drawerOpen} onClick={(e) => handleCopyPublicID(e)}>
          <div>
            <span>Room ID:</span>
            <br />
            <InputBase id={ELE_PUBLIC_ID} value={publicID} inputProps={{'aria-label': 'naked'}} />
          </div>
          <StyledListItemIcon>
            <FileCopyOutlinedIcon />
          </StyledListItemIcon>
        </StyledListItem>
      </List>

      <StyledList>
        <Tooltip title="About" placement="right">
          <ListItem button onClick={handleAboutModalOpen}>
            <StyledListItemIcon>
              <HelpIcon />
            </StyledListItemIcon>
            <ListItemText primary={'About'} />
          </ListItem>
        </Tooltip>
        <Tooltip title="Source Code" placement="right">
          <ListItem button onClick={handleSourceRedirect}>
            <StyledListItemIcon>
              <GitHubIcon />
            </StyledListItemIcon>
            <ListItemText primary={'Source'} />
          </ListItem>
        </Tooltip>
      </StyledList>
    </>
  );
};

const ConsumedDrawerOptionList = (props: Props) => (
  <IdentityContext.Consumer>
    {({publicID}: IIdentityContextVariable) => <DrawerOptionList publicID={publicID} {...props} />}
  </IdentityContext.Consumer>
);

export default ConsumedDrawerOptionList;
