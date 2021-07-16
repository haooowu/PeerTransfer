import React from 'react';
import {Popper} from '@material-ui/core';
import {PopperContentWrapper, ContentTitle} from 'src/styles/styled-components/StyledPopperContent';
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
      <PopperContentWrapper>
        <ContentTitle>
          {enterType === 'drag' && 'Drop here to send files'}
          {enterType === 'mouse' && `Click here to ${isSelf ? 'send to all' : 'send files'}`}
        </ContentTitle>
      </PopperContentWrapper>
    </Popper>
  );
};

export default DropzoneTooltipPopper;
