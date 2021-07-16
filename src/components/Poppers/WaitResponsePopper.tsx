import React from 'react';
import styled from 'styled-components';
import {Popper, Paper, DialogTitle} from '@material-ui/core';
import usePopperStyles from 'src/styles/hooks/usePopperStyles';
import {IPeerField} from 'src/types';
import {DATA_CHANNEL_TIMEOUT, GOT_REMOTE_DESC} from 'src/constants';

interface IWaitResponsePopperData {
  isOpen: boolean;
  gotRemoteDesc: boolean;
}

export const initialWaitResponsePopperData: IWaitResponsePopperData = {
  isOpen: false,
  gotRemoteDesc: false,
};

type WaitResponsePopperReducerAction =
  | {type: 'clear'}
  | {type: 'set_open_with_desc'}
  | {type: 'set_open_without_desc'}
  | {type: 'set_desc'};

export const waitResponsePopperReducer = (
  state: IWaitResponsePopperData,
  action: WaitResponsePopperReducerAction,
): IWaitResponsePopperData => {
  switch (action.type) {
    case 'clear':
      return {
        ...initialWaitResponsePopperData,
      };
    case 'set_open_with_desc':
      return {
        isOpen: true,
        gotRemoteDesc: true,
      };

    case 'set_open_without_desc':
      return {
        isOpen: true,
        gotRemoteDesc: false,
      };
    case 'set_desc':
      return {
        ...state,
        gotRemoteDesc: true,
      };
    default:
      return state;
  }
};

interface Props extends IWaitResponsePopperData {
  targetPeer: IPeerField;
  anchorElement: any;
}

const WaitResponsePopper: React.FC<Props> = ({targetPeer, gotRemoteDesc, anchorElement}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const classes = usePopperStyles();

  React.useEffect(() => {
    sessionStorage.setItem(GOT_REMOTE_DESC, '1');
    let timeoutReload: NodeJS.Timeout;
    if (gotRemoteDesc) {
      timeoutReload = setTimeout(() => {
        sessionStorage.setItem(DATA_CHANNEL_TIMEOUT, '1');
        window.location.reload();
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutReload);
      sessionStorage.removeItem(GOT_REMOTE_DESC);
    };
  }, [gotRemoteDesc]);

  return (
    <Popper
      open={!!anchorElement}
      anchorEl={anchorElement}
      placement="top"
      disablePortal
      className={classes.popper}
      modifiers={{
        arrow: {
          element: arrowRef,
        },
      }}
    >
      <div className={classes.arrow} ref={setArrowRef} />
      <Paper className={classes.paper}>
        {gotRemoteDesc ? (
          <>
            <DialogTitle>Preparing data channel with {targetPeer.emoji}...</DialogTitle>
          </>
        ) : (
          <>
            <DialogTitle>Waiting for {targetPeer.emoji}'s response...</DialogTitle>
          </>
        )}
      </Paper>
    </Popper>
  );
};

export default WaitResponsePopper;
