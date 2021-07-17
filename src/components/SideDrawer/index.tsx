import React from 'react';
import styled from 'styled-components';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import useDrawerStyles from 'src/styles/hooks/useDrawerStyles';

import {AppSettingContext, IAppSettingContextVariable} from 'src/providers/AppSettingProvider';
import DrawerOptionList from 'src/components/SideDrawer/DrawerOptionList';
import JoinRoomModal from 'src/components/SideDrawer/JoinRoomModal';
import AboutModal from './AboutModal';

const StyledIconButton = styled(IconButton)`
  width: ${(props) => props.theme.drawerMinWidth};
  height: ${(props) => props.theme.drawerMinWidth};
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

interface ISideDrawer extends Props {
  contextProps: IAppSettingContextVariable;
}

const SideDrawer: React.FC<ISideDrawer> = ({gestureDirection, contextProps}) => {
  const classes = useDrawerStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [joinRoomModalOpen, setJoinRoomModalOpen] = React.useState(false);
  const [aboutModalOpen, setAboutModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (gestureDirection === 'left') setDrawerOpen(false);
    if (gestureDirection === 'right') setDrawerOpen(true);
    if (!gestureDirection) setDrawerOpen(false);
  }, [gestureDirection]);

  const handleToggle = () => setDrawerOpen((prev) => !prev);

  const handleJoinRoomModalOpen = () => setJoinRoomModalOpen(true);

  const handleAboutModalOpen = () => setAboutModalOpen(true);

  return (
    <StyledDrawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
    >
      <div className={classes.titleBar}>
        {drawerOpen && <div className={classes.titleText}>PeerTransfer</div>}
        <Tooltip title={drawerOpen ? 'Close Menu' : 'Open Menu'} placement="right">
          <StyledIconButton disableRipple onClick={handleToggle}>
            {drawerOpen ? <ArrowBackIcon /> : <MenuIcon />}
          </StyledIconButton>
        </Tooltip>
      </div>

      <Divider />

      <DrawerOptionList
        drawerOpen={drawerOpen}
        handleJoinRoomModalOpen={handleJoinRoomModalOpen}
        handleAboutModalOpen={handleAboutModalOpen}
        {...contextProps}
      />

      <JoinRoomModal open={joinRoomModalOpen} handleClose={() => setJoinRoomModalOpen(false)} />

      <AboutModal open={aboutModalOpen} handleClose={() => setAboutModalOpen(false)} />
    </StyledDrawer>
  );
};

const ConsumedSideDrawer = (props: Props) => (
  <AppSettingContext.Consumer>
    {(appSettingContext: IAppSettingContextVariable) => <SideDrawer {...props} contextProps={appSettingContext} />}
  </AppSettingContext.Consumer>
);

export default ConsumedSideDrawer;
