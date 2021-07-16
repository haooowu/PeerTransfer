import React from 'react';
import styled from 'styled-components';
import {Button, Popper, Paper, DialogContentText} from '@material-ui/core';
import usePopperStyles from 'src/styles/hooks/usePopperStyles';
import {IFileMeta, IPeerField} from 'src/types';
import readableBytes from 'src/utils/readableBytes';

const StyledDialogContentText = styled(DialogContentText)`
  font-size: calc(10px + 1vmin) !important;
`;

const StyledButton = styled(Button)`
  margin-left: 8px !important;
`;

interface INotifyOfferPopperData {
  isOpen: boolean;
  fileMetas: IFileMeta[] | null;
}

export const initialNotifyOfferPopperData: INotifyOfferPopperData = {
  isOpen: false,
  fileMetas: null,
};

type NotifyOfferPopperReducerAction = {type: 'clear'} | {type: 'set_file_metas'; payload: {fileMetas: IFileMeta[]}};

export const notifyOfferPopperReducer = (
  state: INotifyOfferPopperData,
  action: NotifyOfferPopperReducerAction,
): INotifyOfferPopperData => {
  switch (action.type) {
    case 'clear':
      return {
        ...initialNotifyOfferPopperData,
      };
    case 'set_file_metas':
      return {
        isOpen: true,
        fileMetas: action.payload.fileMetas,
      };
    default:
      return state;
  }
};

interface Props extends INotifyOfferPopperData {
  targetPeer: IPeerField;
  onCancelFileTransfer: () => Promise<void>;
  onAcceptFileTransfer: () => Promise<void>;
  setClose: () => void;
  anchorElement: any;
}

const NotifyOfferPopper: React.FC<Props> = ({
  setClose,
  anchorElement,
  fileMetas,
  targetPeer,
  onCancelFileTransfer,
  onAcceptFileTransfer,
}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const classes = usePopperStyles();

  const handleDecline = () => {
    onCancelFileTransfer();
    setClose();
  };

  const handleAccept = () => {
    onAcceptFileTransfer();
    setClose();
  };

  return (
    <Popper
      open={!!anchorElement}
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
          {targetPeer.emoji} from {targetPeer.platform} {targetPeer.browser} wants to send:
        </div>
        <div className={classes.body}>
          {fileMetas?.map((fileMeta, i) => (
            <StyledDialogContentText key={`${targetPeer.id}-meta-${i}`}>
              {fileMeta!.name} ({readableBytes(fileMeta!.size)})
            </StyledDialogContentText>
          ))}
        </div>
        <div className={classes.footer}>
          <StyledButton variant="contained" size="small" onClick={handleAccept} color="secondary">
            Accept
          </StyledButton>
          <StyledButton variant="outlined" size="small" onClick={handleDecline} color="secondary">
            Decline
          </StyledButton>
        </div>
      </Paper>
    </Popper>
  );
};

export default NotifyOfferPopper;
