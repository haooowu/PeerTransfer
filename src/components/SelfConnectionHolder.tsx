import React from 'react';
import {rgba} from 'polished';
import {toast} from 'react-toastify';
import styled, {keyframes} from 'styled-components';
import {Button} from '@material-ui/core';
import {EnterType, IFileMeta, IPeerField} from 'src/types';
import {useDropzone, FileRejection} from 'react-dropzone';
import DropzoneTooltipPopper from 'src/components/Poppers/DropzoneTooltipPopper';
import {MAXIMUM_FILE_BYTE, MAXIMUM_FILE_NUMBER} from 'src/constants/numericValues';
import handleFileRejectedToast from 'src/utils/handleFileRejectedToast';

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
`;

const color = rgba('#468266', 0.3);

const circleRipple = keyframes`
  0% {
    box-shadow: 
      0 0 0 0 ${color}, 
      0 0 0 1em ${color}, 
      0 0 0 3em ${color}, 
      0 0 0 5em ${color};
  }
  100% {
    box-shadow:
      0 0 0 1em ${color}, 
      0 0 0 3em ${color},
      0 0 0 5em ${color}, 
      0 0 0 8em transparent;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.secondary.main} !important;
  color: ${(props) => props.theme.secondary.contrastText} !important;
  &:hover {
    background: ${(props) => props.theme.secondary.dark} !important;
  }
  border-radius: 50% !important;
  height: 64px;
  width: 64px;
  animation: ${circleRipple} 0.7s linear infinite;
`;

interface Props {
  selfIdentity: IPeerField;
  localID: string;
  publicID: string;
  shouldDisableActionBtn: boolean;
  handleFileInputChange: (files: File[]) => void;
}

const SelfConnectionHolder: React.FC<Props> = ({selfIdentity, shouldDisableActionBtn, handleFileInputChange}) => {
  const [enterType, setEnterType] = React.useState<EnterType>(null);
  const anchorRef = React.useRef(null);

  const onDragEnter = () => setEnterType('drag');
  const onDragLeave = () => setEnterType(null);
  const onMouseEnter = () => setEnterType('mouse');
  const onMouseLeave = () => setEnterType(null);

  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: MAXIMUM_FILE_NUMBER,
    maxSize: MAXIMUM_FILE_BYTE,
    disabled: shouldDisableActionBtn,
    onDragEnter,
    onDragLeave,
    onDropAccepted: handleFileInputChange,
    onDropRejected: handleFileRejectedToast,
  });

  React.useEffect(() => {
    if (shouldDisableActionBtn) setEnterType(null);
  }, [shouldDisableActionBtn]);

  const avatarButtonClick = () => ((document.getElementById(`fileInput-self`) as HTMLInputElement).value = '');

  return (
    <Wrapper>
      <div {...getRootProps()}>
        <StyledButton
          ref={anchorRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={avatarButtonClick}
          variant="contained"
        >
          <span>{selfIdentity?.emoji}</span>
          <input id={`fileInput-self`} {...getInputProps()} />
        </StyledButton>
        <div>Test</div>
      </div>
      {enterType && <DropzoneTooltipPopper isSelf={true} enterType={enterType} anchorElement={anchorRef.current} />}
    </Wrapper>
  );
};

export default SelfConnectionHolder;
