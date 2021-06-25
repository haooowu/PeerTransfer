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
  fileMeta: IFileMeta | null;
}

interface Props extends INotifyOfferPopperData {
  targetPeer: IPeerField;
  onRejectFileTransfer: () => Promise<void>;
  onAcceptFileTransfer: () => Promise<void>;
  setClose: () => void;
  anchorElement: any;
}

const NotifyOfferPopper: React.FC<Props> = ({
  setClose,
  anchorElement,
  fileMeta,
  targetPeer,
  onRejectFileTransfer,
  onAcceptFileTransfer,
}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const classes = usePopperStyles();

  const handleDecline = () => {
    onRejectFileTransfer();
    setClose();
  };

  const handleAccept = () => {
    onAcceptFileTransfer();
    setClose();
  };

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
        <DialogTitle>
          {targetPeer.emoji} from {targetPeer.platform} {targetPeer.browser} wants to send:
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {fileMeta!.name} ({fileMeta!.size} bytes)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDecline} color="primary">
            Decline
          </Button>
          <Button onClick={handleAccept} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Paper>
    </Popper>
  );
};

export default NotifyOfferPopper;
