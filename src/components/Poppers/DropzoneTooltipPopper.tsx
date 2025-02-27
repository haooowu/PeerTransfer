import React from "react";
import { PopperContentWrapper, ContentTitle } from "src/styles/styled-components/StyledPopperContent";
import Popper, { Arrow, commonPopperModifiers } from "src/styles/styled-mui/StyledPopper";
import { EnterType } from "src/types";

interface Props {
  enterType: EnterType;
  isSelf: boolean;
  anchorElement: HTMLElement;
}

const DropzoneTooltipPopper: React.FC<Props> = ({ enterType, anchorElement, isSelf }) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);

  return (
    <Popper
      open={!!anchorElement && !!enterType}
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
          {enterType === "drag" && "Drop here to send files"}
          {enterType === "mouse" && `Click here to ${isSelf ? "send to all" : "send files"}`}
        </ContentTitle>
      </PopperContentWrapper>
    </Popper>
  );
};

export default DropzoneTooltipPopper;
