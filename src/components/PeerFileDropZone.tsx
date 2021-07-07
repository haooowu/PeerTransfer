import React from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {Button} from '@material-ui/core';
import {EnterType, IPeerField} from 'src/types';
import Dropzone, {FileRejection} from 'react-dropzone';
import DropzoneTooltipPopper from 'src/components/Poppers/DropzoneTooltipPopper';
import {MAXIMUM_FILE_BYTE, MAXIMUM_FILE_NUMBER} from 'src/constants/numericValues';

const StyledButton = styled(Button)`
  position: absolute;
  background-color: ${(props) => props.theme.secondary.main} !important;
  color: ${(props) => props.theme.secondary.contrastText} !important;
  &:hover {
    background: ${(props) => props.theme.secondary.dark} !important;
  }
`;
interface Props {
  shouldDisableActionBtn: boolean;
  handleFileInputChange: (files: File[]) => Promise<void>;
  targetPeer: IPeerField;
  setAnchorElement: React.Dispatch<React.SetStateAction<any>>;
}

const PeerFileDropZone: React.FC<Props> = ({
  shouldDisableActionBtn,
  handleFileInputChange,
  targetPeer,
  setAnchorElement,
}) => {
  const [enterType, setEnterType] = React.useState<EnterType>(null);
  const anchorRef = React.useRef(null);

  React.useLayoutEffect(() => {}, []);

  React.useEffect(() => {
    if (anchorRef.current) setAnchorElement(anchorRef.current);
  }, [anchorRef, setAnchorElement]);

  React.useEffect(() => {
    if (shouldDisableActionBtn) setEnterType(null);
  }, [shouldDisableActionBtn]);

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

  const onDragEnter = () => setEnterType('drag');

  const onDragLeave = () => setEnterType(null);

  const onMouseEnter = () => setEnterType('mouse');

  const onMouseLeave = () => setEnterType(null);

  return (
    <>
      <Dropzone
        maxFiles={MAXIMUM_FILE_NUMBER}
        maxSize={MAXIMUM_FILE_BYTE}
        disabled={shouldDisableActionBtn}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDropAccepted={handleFileInputChange}
        onDropRejected={handleFileRejected}
      >
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <StyledButton
              ref={anchorRef}
              disabled={shouldDisableActionBtn}
              onMouseOver={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={avatarButtonClick}
              variant="contained"
            >
              <input id={`fileInput-${targetPeer.id}`} {...getInputProps()} />
              <span>{targetPeer.emoji}</span>
            </StyledButton>
          </div>
        )}
      </Dropzone>
      {enterType && <DropzoneTooltipPopper enterType={enterType} anchorElement={anchorRef.current} />}
    </>
  );
};

export default PeerFileDropZone;
