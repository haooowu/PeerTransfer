import React from 'react';
import styled from 'styled-components';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

import Tooltip from '@material-ui/core/Tooltip';

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import CloudIcon from '@material-ui/icons/CloudDownloadSharp';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import ChatIcon from '@material-ui/icons/Chat';
import ChatOffIcon from '@material-ui/icons/SpeakerNotesOff';
import useDrawerStyles from 'src/styles/useDrawerStyles';
import LightBrightnessIcon from '@material-ui/icons/Brightness7';
import DarkBrightnessIcon from '@material-ui/icons/Brightness4';
import {AppSettingContext, IAppSettingContextVariable} from 'src/providers/AppSettingProvider';

const StyledIconButton = styled(IconButton)`
  width: ${(props) => props.theme.drawerMinWidth};
  height: ${(props) => props.theme.drawerMinWidth};
  color: ${(props) => props.theme.primary.contrastText} !important;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  margin-right: -16px;
  color: ${(props) => props.theme.primary.contrastText} !important;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: ${(props) => props.theme.primary.light} !important;
    color: ${(props) => props.theme.primary.contrastText} !important;
    overflow-x: hidden;
  }
`;

interface Props {
  gestureDirection: 'left' | 'right' | undefined;
}

interface ISideDrawer extends Props, IAppSettingContextVariable {}

const SideDrawer: React.FC<ISideDrawer> = ({
  gestureDirection,
  shouldAutoAccept,
  shouldAutoDownload,
  appTheme,
  toggleAutoAccept,
  toggleAutoDownload,
  toggleLightDarkTheme,
}) => {
  const classes = useDrawerStyles();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (gestureDirection === 'left') setOpen(false);
    if (gestureDirection === 'right') setOpen(true);
    if (!gestureDirection) setOpen(false);
  }, [gestureDirection]);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
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
        <Tooltip title={open ? 'Close Menu' : 'Open Menu'} placement="right">
          <StyledIconButton disableRipple onClick={handleToggle}>
            {open ? <ArrowBackIcon /> : <MenuIcon />}
          </StyledIconButton>
        </Tooltip>
      </div>
      <Divider />
      <List>
        <Tooltip title={'Auto Accept Toggle'} placement="right">
          <ListItem button onClick={toggleAutoAccept}>
            <StyledListItemIcon>{shouldAutoAccept ? <ChatIcon /> : <ChatOffIcon />}</StyledListItemIcon>
            <ListItemText primary={'Auto Accept Request'} />
            <Switch checked={shouldAutoAccept} inputProps={{'aria-label': 'secondary checkbox'}} />
          </ListItem>
        </Tooltip>

        <Tooltip title={'Auto Download Toggle'} placement="right">
          <ListItem button onClick={toggleAutoDownload}>
            <StyledListItemIcon>{shouldAutoDownload ? <CloudIcon /> : <CloudOffIcon />}</StyledListItemIcon>
            <ListItemText primary={'Auto Download Files'} />
            <Switch checked={shouldAutoDownload} inputProps={{'aria-label': 'secondary checkbox'}} />
          </ListItem>
        </Tooltip>
      </List>
      <Divider />
      <List>
        <Tooltip title="Brightness Theme Toggle" placement="right">
          <ListItem button onClick={toggleLightDarkTheme}>
            <StyledListItemIcon>
              {appTheme === 'light' ? <LightBrightnessIcon /> : <DarkBrightnessIcon />}
            </StyledListItemIcon>
            <ListItemText primary={'Light / Dark Themes'} />
          </ListItem>
        </Tooltip>
        <Tooltip title="Join Another Room" placement="right">
          <ListItem button>
            <StyledListItemIcon>
              <AccountTreeIcon />
            </StyledListItemIcon>
            <ListItemText primary={'Join a room'} />
          </ListItem>
        </Tooltip>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <StyledListItemIcon>
            <HelpIcon />
          </StyledListItemIcon>
          <ListItemText primary={'About'} />
        </ListItem>
        <ListItem button>
          <StyledListItemIcon>
            <GitHubIcon />
          </StyledListItemIcon>
          <ListItemText primary={'Source'} />
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

const ConsumedSideDrawer = (props: Props) => (
  <AppSettingContext.Consumer>
    {(appSettingContext: IAppSettingContextVariable) => <SideDrawer {...props} {...appSettingContext} />}
  </AppSettingContext.Consumer>
);

export default ConsumedSideDrawer;
