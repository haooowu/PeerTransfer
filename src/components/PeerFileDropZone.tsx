import React from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {Button, Paper, DialogTitle, Popper} from '@material-ui/core';
import {IPeerField} from 'src/types';
import Dropzone, {FileRejection} from 'react-dropzone';
import DropzoneTooltipPopper from 'src/components/Poppers/DropzoneTooltipPopper';
import {MAXIMUM_FILE_BYTE, MAXIMUM_FILE_NUMBER} from 'src/constants/numericValues';
import usePopperStyles from 'src/styles/usePopperStyles';

// TODO-sprint: once waiting connection / transferring disable event on same peer
interface Props {
  handleFileInputChange: (files: File[]) => Promise<void>;
  targetPeer: IPeerField;
  setAnchorElement: React.Dispatch<React.SetStateAction<any>>;
}

const PeerFileDropZone: React.FC<Props> = ({handleFileInputChange, targetPeer, setAnchorElement}) => {
  const anchorRef = React.useRef(null);

  React.useEffect(() => {
    if (anchorRef.current) setAnchorElement(anchorRef.current);
  }, [anchorRef, setAnchorElement]);

  function handleFileRejected(fileRejections: FileRejection[]) {
    if (fileRejections.length > MAXIMUM_FILE_NUMBER) {
      toast.error(`The maximum number of transfer files is set up to ${MAXIMUM_FILE_NUMBER}`);
    } else {
      fileRejections.forEach(({file, errors}) => {
        toast.error(
          `Unable to transfer ${file.name}${
            errors.find((error) => error.code === 'file-too-large')
              ? '. The maximum size per file is set up to 16mb'
              : ''
          }`,
        );
      });
    }
  }

  const avatarButtonClick = () =>
    ((document.getElementById(`fileInput-${targetPeer.id}`) as HTMLInputElement).value = '');

  const onDragEnter = () => console.log('drag enter');

  const onDragLeave = () => console.log('drag leave');

  return (
    <>
      <Dropzone
        maxFiles={MAXIMUM_FILE_NUMBER}
        maxSize={MAXIMUM_FILE_BYTE}
        disabled={false}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDropAccepted={handleFileInputChange}
        onDropRejected={handleFileRejected}
      >
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <Button ref={anchorRef} onClick={avatarButtonClick} color="primary" variant="contained">
              <input id={`fileInput-${targetPeer.id}`} {...getInputProps()} />
              <span>{targetPeer.emoji}</span>
            </Button>
          </div>
        )}
      </Dropzone>
      <DropzoneTooltipPopper anchorElement={anchorRef.current} />
    </>
  );
};

export default PeerFileDropZone;
