import React from 'react';
import styled from 'styled-components';
import {Button, Popper, Paper, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import LinearProgress from 'src/components/LinearProgress';
import usePopperStyles from 'src/styles/usePopperStyles';
import {IPeerField, IDownloadableFile} from 'src/types';

const StyledAnchor = styled.a``;

export interface IProgressPopperData {
  isOpen: boolean;
  fileProgress: number;
  downloadableFiles: IDownloadableFile[];
  progressType: 'send' | 'receive' | null;
}

export const initialProgressPopperData: IProgressPopperData = {
  isOpen: false,
  progressType: null,
  fileProgress: 0,
  downloadableFiles: [],
};
interface Props extends IProgressPopperData {
  targetPeer: IPeerField;
  onCancelFileTransfer: () => Promise<void>;
  setClose: () => void;
  anchorElement: any;
}

const ProgressPopper: React.FC<Props> = ({
  targetPeer,
  setClose,
  fileProgress,
  downloadableFiles,
  progressType,
  anchorElement,
  onCancelFileTransfer,
}) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);
  const [receivedFiles, setReceivedFiles] = React.useState<IDownloadableFile[] | null>(null);
  const classes = usePopperStyles();

  React.useEffect(() => {
    setReceivedFiles(downloadableFiles);
  }, [downloadableFiles]);

  const handleDownloadClick = (file: IDownloadableFile) => {
    setTimeout(() => window.URL.revokeObjectURL(file.fileBlobUrl), 0);
    let filteredFiles = receivedFiles!.filter((prevFile) => prevFile.fileBlobUrl !== file.fileBlobUrl);

    if (filteredFiles.length > 0) {
      setReceivedFiles(filteredFiles);
    } else {
      setClose();
    }
  };

  console.log(downloadableFiles);
  console.log(receivedFiles);

  const handleCancel = () => {
    onCancelFileTransfer();
    handleClose();
  };

  const handleClose = () => setClose();

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
        {progressType === 'receive' ? (
          <>
            <DialogTitle>Downloadable file will show below</DialogTitle>
            <DialogContent>
              {receivedFiles &&
                receivedFiles.map((file, i) => (
                  <DialogContentText key={`${targetPeer.id}-download-${i}`}>
                    <StyledAnchor
                      onClick={() => handleDownloadClick(file)}
                      download={file.fileName}
                      href={file.fileBlobUrl}
                    >
                      click here to download {file.fileName}
                    </StyledAnchor>
                  </DialogContentText>
                ))}
              {fileProgress !== 100 && <LinearProgress progress={fileProgress} />}
            </DialogContent>
            <DialogActions>
              {fileProgress === 100 ? (
                <Button onClick={handleClose} color="primary">
                  close
                </Button>
              ) : (
                <Button onClick={handleCancel} color="primary">
                  cancel
                </Button>
              )}
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Sending...</DialogTitle>
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
