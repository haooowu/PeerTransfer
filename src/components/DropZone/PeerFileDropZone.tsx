import React from 'react';
import styled from 'styled-components';
import {PeerStyledCircleButton} from 'src/styles/styled-components/StyledCircleButton';
import {IPeerField} from 'src/types';
import DropzoneTooltipPopper from 'src/components/Poppers/DropzoneTooltipPopper';
import useCustomDropzone from 'src/components/DropZone/hooks/useCustomDropzone';

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
  onPeerDrop: () => Promise<void>;
  setAnchorElement: React.Dispatch<React.SetStateAction<any>>;
}

const PeerFileDropZone: React.FC<Props> = ({
  shouldDisableActionBtn,
  handleFileInputChange,
  targetPeer,
  onPeerDrop,
  setAnchorElement,
}) => {
  const anchorRef = React.useRef(null);

  const {getRootProps, getInputProps, onMouseEnter, onMouseLeave, enterType} = useCustomDropzone({
    shouldDisableActionBtn,
    handleFileInputChange,
  });

  React.useEffect(() => {
    return () => {
      onPeerDrop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (anchorRef.current) setAnchorElement(anchorRef.current);
  }, [anchorRef, setAnchorElement]);

  const avatarButtonClick = () =>
    ((document.getElementById(`fileInput-${targetPeer.id}`) as HTMLInputElement).value = '');

  return (
    <>
      <div {...getRootProps()}>
        <PeerStyledCircleButton
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
        </PeerStyledCircleButton>
      </div>
      <IdentityWrapper>
        {targetPeer.platform}-{targetPeer.browser}
      </IdentityWrapper>
      {enterType && <DropzoneTooltipPopper isSelf={false} enterType={enterType} anchorElement={anchorRef.current} />}
    </>
  );
};

export default PeerFileDropZone;
