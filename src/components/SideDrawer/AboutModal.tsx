import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<Props> = ({open, onClose}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      Hello world
    </Dialog>
  );
};

export default AboutModal;
