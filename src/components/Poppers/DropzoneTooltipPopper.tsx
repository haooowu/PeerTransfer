import React from 'react';
import styled from 'styled-components';
import {Button, Popper, Paper, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import usePopperStyles from 'src/styles/usePopperStyles';
import {IFileMeta, IPeerField} from 'src/types';

// TODO-sprint: on drag enter/leave/ onMouseOver/onMouseOut

interface Props {
  anchorElement: any;
}

const DropzoneTooltipPopper: React.FC<Props> = ({anchorElement}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const classes = usePopperStyles();

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
        <DialogTitle>Drop message here</DialogTitle>
      </Paper>
    </Popper>
  );
};

export default DropzoneTooltipPopper;
