import React from 'react';
import styled from 'styled-components';
import {Button, Popper, Paper, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import LinearProgress from 'src/components/LinearProgress';
import usePopperStyles from 'src/styles/usePopperStyles';
import {IPeerField} from 'src/types';

const StyledAnchor = styled.a``;

export interface IProgressPopperData {
  isOpen: boolean;
  fileProgress: number;
  fileBlobUrl: string;
  fileName: string;
  progressType: 'send' | 'receive' | null;
}

export const initialProgressPopperData: IProgressPopperData = {
  isOpen: false,
  progressType: null,
  fileProgress: 0,
  fileBlobUrl: '',
  fileName: '',
};

interface Props extends IProgressPopperData {
  targetPeer: IPeerField;
  onRejectFileTransfer: () => Promise<void>;
  setClose: () => void;
  anchorElement: any;
}

const ProgressPopper: React.FC<Props> = ({
  setClose,
  fileProgress,
  fileName,
  fileBlobUrl,
  progressType,
  anchorElement,
  onRejectFileTransfer,
}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const classes = usePopperStyles();

  const handleDownload = () => {
    setTimeout(() => window.URL.revokeObjectURL(fileBlobUrl), 0);
    setClose();
  };

  const handleCancel = () => {
    onRejectFileTransfer();
    setClose();
  };

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
        {fileBlobUrl && fileProgress === 100 ? (
          <>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <StyledAnchor onClick={handleDownload} download={fileName} href={fileBlobUrl}>
                  click here to download {fileName}
                </StyledAnchor>
              </DialogContentText>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>{progressType === 'send' ? 'Sending' : 'Receiving'}...</DialogTitle>
            <DialogContent>
              <DialogContentText>Waiting for file transfer to complete...</DialogContentText>
              <LinearProgress progress={fileProgress} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary">
                cancel
              </Button>
            </DialogActions>
          </>
        )}
      </Paper>
    </Popper>
  );
};

export default ProgressPopper;
