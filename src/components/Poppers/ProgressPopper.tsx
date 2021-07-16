import React from 'react';
import {Popper} from '@material-ui/core';
import {
  PopperContentWrapper,
  ContentTitle,
  ContentBody,
  ContentFooter,
  StyledPopperButton,
  DownloadLinksHolder,
  StyledDownloadLink,
} from 'src/styles/styled-components/StyledPopperContent';
import LinearProgress from 'src/components/Poppers/views/LinearProgress';
import usePopperStyles from 'src/styles/hooks/usePopperStyles';
import {IPeerField, IDownloadableFile} from 'src/types';

interface IProgressPopperData {
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

type progressPopperReducerAction =
  | {type: 'clear'}
  | {type: 'set_received_progress'; payload: {progress: number}}
  | {type: 'set_sent_progress'; payload: {progress: number}}
  | {type: 'set_downloadableFiles'; payload: {downloadableFile: IDownloadableFile}};

export const progressPopperReducer = (
  state: IProgressPopperData,
  action: progressPopperReducerAction,
): IProgressPopperData => {
  switch (action.type) {
    case 'clear':
      return {
        ...initialProgressPopperData,
      };
    case 'set_received_progress':
      return {
        ...state,
        isOpen: true,
        progressType: 'receive',
        fileProgress: action.payload.progress,
      };
    case 'set_sent_progress':
      return {
        ...state,
        isOpen: true,
        progressType: 'send',
        fileProgress: action.payload.progress,
      };
    case 'set_downloadableFiles':
      return {
        ...state,
        downloadableFiles: [...state.downloadableFiles, action.payload.downloadableFile],
      };
    default:
      return state;
  }
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
        {progressType === 'receive' ? (
          <>
            <ContentTitle>Downloadable file will show below</ContentTitle>
            <ContentBody>
              {receivedFiles &&
                receivedFiles.map((file, i) => (
                  <DownloadLinksHolder key={`${targetPeer.id}-download-${i}`}>
                    <StyledDownloadLink
                      onClick={() => handleDownloadClick(file)}
                      download={file.fileName}
                      href={file.fileBlobUrl}
                    >
                      Download {file.fileName}
                    </StyledDownloadLink>
                  </DownloadLinksHolder>
                ))}
              {fileProgress !== 100 && <LinearProgress progress={fileProgress} />}
            </ContentBody>
            <ContentFooter>
              {fileProgress === 100 ? (
                <StyledPopperButton variant="outlined" size="small" onClick={handleClose} color="secondary">
                  close
                </StyledPopperButton>
              ) : (
                <StyledPopperButton variant="outlined" size="small" onClick={handleCancel} color="secondary">
                  cancel
                </StyledPopperButton>
              )}
            </ContentFooter>
          </>
        ) : (
          <>
            <ContentTitle>Sending...</ContentTitle>

            <ContentBody>
              <div>Waiting for file transfer to complete...</div>
              <LinearProgress progress={fileProgress} />
            </ContentBody>

            <ContentFooter>
              <StyledPopperButton variant="outlined" onClick={handleCancel} color="secondary">
                cancel
              </StyledPopperButton>
            </ContentFooter>
          </>
        )}
      </PopperContentWrapper>
    </Popper>
  );
};

export default ProgressPopper;
