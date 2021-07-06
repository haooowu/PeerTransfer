import React from 'react';
import styled from 'styled-components';
import {Popper, Paper, DialogTitle} from '@material-ui/core';
import usePopperStyles from 'src/styles/usePopperStyles';
import {EnterType} from 'src/types';

interface Props {
  enterType: EnterType;
  anchorElement: any;
}

const DropzoneTooltipPopper: React.FC<Props> = ({enterType, anchorElement}) => {
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
        <DialogTitle>
          {enterType === 'drag' && 'Drop here to send files'}
          {enterType === 'mouse' && 'Click here to send files'}
        </DialogTitle>
      </Paper>
    </Popper>
  );
};

export default DropzoneTooltipPopper;
