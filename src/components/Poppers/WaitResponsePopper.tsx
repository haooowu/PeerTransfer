import React from 'react';
import styled from 'styled-components';
import {Button, Popper, Paper, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import usePopperStyles from 'src/styles/usePopperStyles';
import {IPeerField} from 'src/types';
import {DATA_CHANNEL_TIMEOUT, GOT_REMOTE_DESC} from 'src/constants';

export const initialWaitResponsePopperData: IWaitResponsePopperData = {
  isOpen: false,
  gotRemoteDesc: false,
};
export interface IWaitResponsePopperData {
  isOpen: boolean;
  gotRemoteDesc: boolean;
}
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
