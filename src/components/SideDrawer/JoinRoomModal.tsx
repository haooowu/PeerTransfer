import React from 'react';
import {toast} from 'react-toastify';
import {PUBLIC_ID} from 'src/constants';

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

const allowedCharRegex = new RegExp(/^[a-zA-Z0-9+/=]+$/);

const JoinRoomModal: React.FC<Props> = ({open, handleClose}) => {
  const [input, setInput] = React.useState('');

  const handleConfirm = () => {
    if (!input.trim() || input.length < 1 || input.length > 30) {
      toast.error('Invalid room id format');
      return;
    }
    sessionStorage.setItem(PUBLIC_ID, input);
    window.location.reload();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let targetInput = event.target.value;
    if (allowedCharRegex.test(targetInput) || targetInput === '') setInput(targetInput);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Join or Create Room</DialogTitle>
      <DialogContent>
        <DialogContentText>You can find current room ID by expand the side drawer</DialogContentText>
        <TextField
          onChange={handleChange}
          value={input}
          autoFocus
          color="secondary"
          margin="dense"
          label="Room ID"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinRoomModal;
