import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import appTheme from 'src/styles/theme';

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
      width: 290,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      width: appTheme.drawerMinWidth,
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
  }),
);

export default useDrawerStyles;
