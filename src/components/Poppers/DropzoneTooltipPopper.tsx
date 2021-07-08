import React from 'react';
import styled from 'styled-components';
import {Popper, Paper, DialogTitle} from '@material-ui/core';
import usePopperStyles from 'src/styles/usePopperStyles';
import {EnterType} from 'src/types';

const StyledDialogTitle = styled(DialogTitle)`
  min-width: max-content;
`;

interface Props {
  enterType: EnterType;
  isSelf: boolean;
  anchorElement: any;
}

const DropzoneTooltipPopper: React.FC<Props> = ({enterType, anchorElement, isSelf}) => {
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
        <StyledDialogTitle>
          {enterType === 'drag' && 'Drop here to send files'}
          {enterType === 'mouse' && 'Click here to send files'}
        </StyledDialogTitle>
      </Paper>
    </Popper>
  );
};

export default DropzoneTooltipPopper;
