import React from 'react';
import styled from 'styled-components';
import {Button, Popper, Paper, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import usePopperStyles from 'src/styles/usePopperStyles';
import {IFileMeta, IPeerField} from 'src/types';

export const initialNotifyOfferPopperData: INotifyOfferPopperData = {
  isOpen: false,
  fileMetas: null,
};

export interface INotifyOfferPopperData {
  isOpen: boolean;
  fileMetas: IFileMeta[] | null;
}

interface Props extends INotifyOfferPopperData {
  targetPeer: IPeerField;
  onCancelFileTransfer: () => Promise<void>;
  onAcceptFileTransfer: () => Promise<void>;
  setClose: () => void;
  anchorElement: any;
}

const NotifyOfferPopper: React.FC<Props> = ({
  setClose,
  anchorElement,
  fileMetas,
  targetPeer,
  onCancelFileTransfer,
  onAcceptFileTransfer,
}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const classes = usePopperStyles();

  const handleDecline = () => {
    onCancelFileTransfer();
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
          {fileMetas?.map((fileMeta, i) => (
            <DialogContentText key={`${targetPeer.id}-meta-${i}`}>
              {fileMeta!.name} ({fileMeta!.size} bytes)
            </DialogContentText>
          ))}
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
