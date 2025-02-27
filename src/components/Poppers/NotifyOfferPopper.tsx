import React from "react";
import {
  PopperContentWrapper,
  ContentTitle,
  ContentBody,
  ContentText,
  ContentFooter,
  StyledPopperButton,
} from "src/styles/styled-components/StyledPopperContent";
import Popper, { Arrow, commonPopperModifiers } from "src/styles/styled-mui/StyledPopper";
import { IFileMeta, IPeerField } from "src/types";
import readableBytes from "src/utils/readableBytes";

interface INotifyOfferPopperData {
  isOpen: boolean;
  fileMetas: IFileMeta[] | null;
}

export const initialNotifyOfferPopperData: INotifyOfferPopperData = {
  isOpen: false,
  fileMetas: null,
};

export type NotifyOfferPopperReducerAction =
  | { type: "clear" }
  | { type: "set_file_metas"; payload: { fileMetas: IFileMeta[] } };

export const notifyOfferPopperReducer = (
  state: INotifyOfferPopperData,
  action: NotifyOfferPopperReducerAction,
): INotifyOfferPopperData => {
  switch (action.type) {
    case "clear":
      return {
        ...initialNotifyOfferPopperData,
      };
    case "set_file_metas":
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
  onCancelFileTransfer: () => void;
  onAcceptFileTransfer: () => void;
  setClose: () => void;
  anchorElement: HTMLElement | null;
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
      modifiers={[
        ...commonPopperModifiers,
        {
          name: "arrow",
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
    >
      <Arrow className="MuiPopper-arrow" ref={setArrowRef} />
      <PopperContentWrapper>
        <ContentTitle>
          {targetPeer.emoji} from {targetPeer.platform} {targetPeer.browser} wants to send:
        </ContentTitle>
        <ContentBody>
          {fileMetas?.map((fileMeta, i) => (
            <ContentText key={`${targetPeer.id}-meta-${i}`}>
              {fileMeta!.name} ({readableBytes(fileMeta!.size)})
            </ContentText>
          ))}
        </ContentBody>
        <ContentFooter>
          <StyledPopperButton variant="contained" size="small" onClick={handleAccept} color="secondary">
            Accept
          </StyledPopperButton>
          <StyledPopperButton variant="outlined" size="small" onClick={handleDecline} color="secondary">
            Decline
          </StyledPopperButton>
        </ContentFooter>
      </PopperContentWrapper>
    </Popper>
  );
};

export default NotifyOfferPopper;
