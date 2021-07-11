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

import AccountTreeIcon from '@material-ui/icons/AccountTree';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import HelpIcon from '@material-ui/icons/Help';
import CloudIcon from '@material-ui/icons/CloudQueue';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import DesktopIcon from '@material-ui/icons/DesktopWindows';
import DesktopOffIcon from '@material-ui/icons/DesktopAccessDisabled';
import useDrawerStyles from 'src/styles/useDrawerStyles';

// TODO-sprint: organize theme with styled-components
// https://material-ui.com/components/drawers/

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

interface Props {
  gestureDirection: 'left' | 'right' | undefined;
}

const SideDrawer: React.FC<Props> = ({gestureDirection}) => {
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
  );
};

export default SideDrawer;
