import React from 'react';
import {Popper, Paper} from '@material-ui/core';
import usePopperStyles from 'src/styles/hooks/usePopperStyles';
import {EnterType} from 'src/types';

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
      open={!!anchorElement && !!enterType}
      anchorEl={anchorElement}
      placement="top"
      className={classes.popper}
      modifiers={{
        flip: {
          enabled: true,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'scrollParent',
        },
        arrow: {
          element: arrowRef,
        },
      }}
    >
      <div className={classes.arrow} ref={setArrowRef} />
      <Paper className={classes.paper}>
        <div className={classes.title}>
          {enterType === 'drag' && 'Drop here to send files'}
          {enterType === 'mouse' && `Click here to ${isSelf ? 'send to all' : 'send files'}`}
        </div>
      </Paper>
    </Popper>
  );
};

export default DropzoneTooltipPopper;
