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

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  anchorElement: any;
}

const WaitResponsePopper: React.FC<Props> = ({isOpen, setOpen, anchorElement}) => {
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
        <DialogTitle>{'Send xxx to xxx?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Waiting for response.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen((prevOpen) => !prevOpen)} color="primary">
            Decline
          </Button>
          <Button onClick={() => setOpen((prevOpen) => !prevOpen)} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Paper>
    </Popper>
  );
};

export default WaitResponsePopper;
