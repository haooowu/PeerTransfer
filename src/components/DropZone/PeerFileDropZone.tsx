import React from 'react';
import styled from 'styled-components';
import {StyledCircleButton} from 'src/styles/styled-components/StyledCircleButton';
import {EnterType, IPeerField} from 'src/types';
import Dropzone from 'react-dropzone';
import DropzoneTooltipPopper from 'src/components/Poppers/DropzoneTooltipPopper';
import {MAXIMUM_FILE_BYTE, MAXIMUM_FILE_NUMBER} from 'src/constants/numericValues';
import handleFileRejectedToast from 'src/utils/handleFileRejectedToast';

const IdentityWrapper = styled.div`
  position: relative;
  font-size: 14px;
  color: ${(props) => props.theme.primary.contrastText};
  text-transform: capitalize;
  min-width: max-content;
  left: 50%;
  transform: translateX(-50%);
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

  const onDragEnter = () => setEnterType('drag');
  const onDragLeave = () => setEnterType(null);
  const onMouseEnter = () => setEnterType('mouse');
  const onMouseLeave = () => setEnterType(null);

  React.useEffect(() => {
    if (anchorRef.current) setAnchorElement(anchorRef.current);
  }, [anchorRef, setAnchorElement]);

  React.useEffect(() => {
    if (shouldDisableActionBtn) setEnterType(null);
  }, [shouldDisableActionBtn]);

  const avatarButtonClick = () =>
    ((document.getElementById(`fileInput-${targetPeer.id}`) as HTMLInputElement).value = '');

  return (
    <>
      <Dropzone
        maxFiles={MAXIMUM_FILE_NUMBER}
        maxSize={MAXIMUM_FILE_BYTE}
        disabled={shouldDisableActionBtn}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDropAccepted={handleFileInputChange}
        onDropRejected={handleFileRejectedToast}
      >
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <StyledCircleButton
              className="peerBtn"
              ref={anchorRef}
              disabled={shouldDisableActionBtn}
              onMouseOver={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClick={avatarButtonClick}
              variant="contained"
            >
              <input id={`fileInput-${targetPeer.id}`} {...getInputProps()} />
              <span>{targetPeer.emoji}</span>
            </StyledCircleButton>
          </div>
        )}
      </Dropzone>
      <IdentityWrapper>
        {targetPeer.platform}-{targetPeer.browser}
      </IdentityWrapper>
      {enterType && <DropzoneTooltipPopper isSelf={false} enterType={enterType} anchorElement={anchorRef.current} />}
    </>
  );
};

export default PeerFileDropZone;
