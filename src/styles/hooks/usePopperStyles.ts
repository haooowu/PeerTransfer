import {makeStyles} from '@material-ui/core/styles';

const usePopperStyles = makeStyles((theme) => ({
  root: {
    zIndex: 9,
  },
  paper: {
    maxWidth: 400,
    overflow: 'auto',
    textAlign: 'left',
    padding: 14,
  },
  title: {
    fontSize: 'calc(8px + 1vmin)',
    minWidth: 'max-content',
  },
  body: {
    marginTop: 16,
    marginBottom: 8,
    maxHeight: 200,
    overflowY: 'auto',
    userSelect: 'none',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  popper: {
    zIndex: 99,
    '&[x-placement*="top"]': {
      top: '-8px !important',
    },
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
      },
    },
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
}));

export default usePopperStyles;
