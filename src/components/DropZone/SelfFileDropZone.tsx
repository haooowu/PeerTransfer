import React from 'react';
import styled from 'styled-components';
import {IPeerField} from 'src/types';
import DropzoneTooltipPopper from 'src/components/Poppers/DropzoneTooltipPopper';
import {OwnStyledCircleButton} from 'src/styles/styled-components/StyledCircleButton';
import useCustomDropzone from 'src/components/DropZone/hooks/useCustomDropzone';

const Wrapper = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
  padding-left: ${(props) => props.theme.drawerMinWidth};
`;

const IdentityWrapper = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.primary.contrastText};
  text-transform: capitalize;
`;

interface Props {
  selfIdentity: IPeerField;
  localID: string;
  publicID: string;
  shouldDisableActionBtn: boolean;
  handleFileInputChange: (files: File[]) => void;
}

const SelfFileDropZone: React.FC<Props> = ({selfIdentity, shouldDisableActionBtn, handleFileInputChange}) => {
  const anchorRef = React.useRef(null);

  const {getRootProps, getInputProps, onMouseEnter, onMouseLeave, enterType} = useCustomDropzone({
    shouldDisableActionBtn,
    handleFileInputChange,
  });

  const avatarButtonClick = () => ((document.getElementById(`fileInput-self`) as HTMLInputElement).value = '');

  return (
    <Wrapper>
      <div {...getRootProps()}>
        <OwnStyledCircleButton
          className="peerBtn"
          ref={anchorRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={avatarButtonClick}
          variant="contained"
        >
          <span>{selfIdentity.emoji}</span>
          <input id={`fileInput-self`} {...getInputProps()} />
        </OwnStyledCircleButton>
        <IdentityWrapper>
          You: {selfIdentity.platform}-{selfIdentity.browser}
        </IdentityWrapper>
      </div>
      {'mouse' && <DropzoneTooltipPopper isSelf={true} enterType={enterType} anchorElement={anchorRef.current} />}
    </Wrapper>
  );
};

export default SelfFileDropZone;
