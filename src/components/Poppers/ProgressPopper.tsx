import React from 'react';
import styled from 'styled-components';
import {Button, Popper, Paper, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import LinearProgress from 'src/components/LinearProgress';
import usePopperStyles from 'src/styles/usePopperStyles';
import {IPeerField} from 'src/types';

export interface IProgressPopperData {
  isOpen: boolean;
  fileProgress: number;
  progressType: 'send' | 'receive' | null;
}

interface Props extends IProgressPopperData {
  targetPeer: IPeerField;
  setClose: () => void;
  anchorElement: any;
}

const ProgressPopper: React.FC<Props> = ({isOpen, setClose, targetPeer, fileProgress, progressType, anchorElement}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const classes = usePopperStyles();

  return (
    <Popper
      open={!!anchorElement && isOpen}
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
        <DialogTitle>{progressType === 'send' ? 'Sending' : 'Receiving'}...</DialogTitle>
        <DialogContent>
          <DialogContentText>Waiting for file transfer to complete...</DialogContentText>
          {progressType === 'send' && <LinearProgress id={`sendProgress-${targetPeer.id}`} progress={fileProgress} />}
          {progressType === 'receive' && (
            <LinearProgress id={`receiveProgress-${targetPeer.id}`} progress={fileProgress} />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={setClose} color="primary">
            cancel
          </Button>
        </DialogActions>
      </Paper>
    </Popper>
  );
};

export default ProgressPopper;
