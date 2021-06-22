import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Popper,
  Typography,
  Paper,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import usePopperStyles from 'src/styles/usePopperStyles';
import {IFileMeta, IPeerField} from 'src/types';
export interface INotifyOfferPopperData {
  isOpen: boolean;
}

interface Props extends INotifyOfferPopperData {
  fileMeta: IFileMeta | undefined;
  targetPeer: IPeerField;
  setClose: () => void;
  anchorElement: any;
}

const NotifyOfferPopper: React.FC<Props> = ({isOpen, setClose, anchorElement, fileMeta, targetPeer}) => {
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
        <DialogTitle>
          {targetPeer.emoji} from {targetPeer.platform} {targetPeer.browser} wants to send:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {fileMeta!.name} ({fileMeta!.size})
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={setClose} color="primary">
            Decline
          </Button>
          <Button onClick={setClose} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Paper>
    </Popper>
  );
};

export default NotifyOfferPopper;
