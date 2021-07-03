import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    hide: {
      display: 'none',
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: 280,
      color: 'white',
      backgroundColor: '#3c4350',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      width: 55,
      color: 'white',
      backgroundColor: '#3c4350',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflow: 'hidden',
    },
    titleText: {
      fontSize: 22,
      position: 'absolute',
      left: 16,
    },
    titleBar: {
      display: 'flex',
      alignItems: 'center',
      height: 60,
      justifyContent: 'flex-end',
    },
    iconBtn: {
      width: 55,
      height: 55,
      color: 'whitesmoke',
    },
    listItemIcon: {
      color: 'whitesmoke',
    },
  }),
);

export default useDrawerStyles;
