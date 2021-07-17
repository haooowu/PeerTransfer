import React from 'react';
import styled from 'styled-components';
import {IdentityContext, IIdentityContextVariable} from 'src/providers/IdentityProvider';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface IJoinRoomModal extends Props {
  setPublicID: React.Dispatch<React.SetStateAction<string>>;
}

// TODO-sprint: join BY roomID dialog (that should only add to presenceDB, child(publicID) remove, then add another new publicID)

const JoinRoomModal: React.FC<IJoinRoomModal> = ({open, setPublicID, handleClose}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
        <TextField autoFocus color="secondary" margin="dense" label="Room ID" type="text" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="secondary">
          Join Room
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ConsumedJoinRoomModal = (props: Props) => (
  <IdentityContext.Consumer>
    {({setPublicID}: IIdentityContextVariable) => <JoinRoomModal setPublicID={setPublicID} {...props} />}
  </IdentityContext.Consumer>
);

export default ConsumedJoinRoomModal;
