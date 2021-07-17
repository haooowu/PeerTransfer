import React from 'react';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface Props {
  open: boolean;
  handleClose: () => void;
}

// TODO-sprint: general FAQ - data disclaimer, browser support, file and size limit

const AboutModal: React.FC<Props> = ({open, handleClose}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>About</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias totam praesentium aut suscipit! Soluta atque
          minima ex officiis, dignissimos modi saepe explicabo quae magnam ad impedit perspiciatis repellat, cumque
          quas.
        </DialogContentText>
        <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias totam praesentium aut suscipit! Soluta atque
          minima ex officiis, dignissimos modi saepe explicabo quae magnam ad impedit perspiciatis repellat, cumque
          quas.
        </DialogContentText>
        <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias totam praesentium aut suscipit! Soluta atque
          minima ex officiis, dignissimos modi saepe explicabo quae magnam ad impedit perspiciatis repellat, cumque
          quas.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
