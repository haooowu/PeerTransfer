import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { PUBLIC_ID } from "src/constants";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StyledDialogActions = styled(DialogActions)`
  padding: 8px 16px !important;
`;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const allowedCharRegex = new RegExp(/^[a-zA-Z0-9+/=]+$/);

const JoinRoomModal: React.FC<Props> = ({ open, handleClose }) => {
  const [input, setInput] = React.useState("");

  const handleConfirm = () => {
    if (!input.trim() || input.length < 1 || input.length > 30) {
      toast.error("Invalid room id format");
      return;
    }
    sessionStorage.setItem(PUBLIC_ID, input);
    window.location.reload();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetInput = event.target.value;
    if (allowedCharRegex.test(targetInput) || targetInput === "") setInput(targetInput);
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
      <StyledDialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary">
          Confirm
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

export default JoinRoomModal;
