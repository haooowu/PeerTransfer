import React from 'react';
import styled from 'styled-components';
import {Button, Popper, Paper, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import usePopperStyles from 'src/styles/usePopperStyles';
import {IPeerField} from 'src/types';

export interface IWaitResponsePopperData {
  isOpen: boolean;
  gotRemoteDesc: boolean;
}
interface Props extends IWaitResponsePopperData {
  targetPeer: IPeerField;
  setClose: () => void;
  anchorElement: any;
}

const WaitResponsePopper: React.FC<Props> = ({targetPeer, gotRemoteDesc, setClose, anchorElement}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const classes = usePopperStyles();

  // TODO-sprint: localhost notify user timeout
  React.useEffect(() => {
    let timeoutReload: NodeJS.Timeout;
    if (gotRemoteDesc) {
      timeoutReload = setTimeout(() => window.location.reload(), 3000);
    }
    return () => {
      clearTimeout(timeoutReload);
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
            <DialogTitle>Preparing data channel with {targetPeer.emoji} ...</DialogTitle>
          </>
        ) : (
          <>
            <DialogTitle>Waiting for {targetPeer.emoji}'s response.</DialogTitle>
            <DialogActions>
              <Button onClick={() => setClose()} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
      </Paper>
    </Popper>
  );
};

export default WaitResponsePopper;
