import React from "react";
import styled from "styled-components";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";

import { AppSettingContext, IAppSettingContextVariable } from "src/providers/AppSettingProvider";
import DrawerOptionList from "src/components/SideDrawer/DrawerOptionList";
import JoinRoomModal from "src/components/SideDrawer/Modals/JoinRoomModal";
import AboutModal from "src/components/SideDrawer/Modals/AboutModal";
import Drawer, { TitleBar, TitleText } from "src/styles/styled-mui/StyledDrawer";

const StyledIconButton = styled(IconButton)`
  width: ${(props) => props.theme.drawerMinWidth};
  height: ${(props) => props.theme.drawerMinWidth};
  color: ${(props) => props.theme.primary.contrastText} !important;
`;

interface Props {
  gestureDirection: "left" | "right" | undefined;
}

interface ISideDrawer extends Props {
  contextProps: IAppSettingContextVariable;
}

const SideDrawer: React.FC<ISideDrawer> = ({ gestureDirection, contextProps }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [joinRoomModalOpen, setJoinRoomModalOpen] = React.useState(false);
  const [aboutModalOpen, setAboutModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (gestureDirection === "left") setDrawerOpen(false);
    if (gestureDirection === "right") setDrawerOpen(true);
  }, [gestureDirection]);

  const handleToggle = () => setDrawerOpen((prev) => !prev);

  const handleJoinRoomModalOpen = () => setJoinRoomModalOpen(true);

  const handleAboutModalOpen = () => setAboutModalOpen(true);

  return (
    <Drawer variant="permanent" open={drawerOpen}>
      <TitleBar>
        {drawerOpen && <TitleText>PeerTransfer</TitleText>}
        <Tooltip title={drawerOpen ? "Close Menu" : "Open Menu"} placement="right">
          <StyledIconButton disableRipple onClick={handleToggle}>
            {drawerOpen ? <ArrowBackIcon /> : <MenuIcon />}
          </StyledIconButton>
        </Tooltip>
      </TitleBar>

      <Divider />

      <DrawerOptionList
        drawerOpen={drawerOpen}
        handleJoinRoomModalOpen={handleJoinRoomModalOpen}
        handleAboutModalOpen={handleAboutModalOpen}
        {...contextProps}
      />

      <JoinRoomModal open={joinRoomModalOpen} handleClose={() => setJoinRoomModalOpen(false)} />

      <AboutModal open={aboutModalOpen} handleClose={() => setAboutModalOpen(false)} />
    </Drawer>
  );
};

const ConsumedSideDrawer = (props: Props) => (
  <AppSettingContext.Consumer>
    {(appSettingContext: IAppSettingContextVariable) => <SideDrawer {...props} contextProps={appSettingContext} />}
  </AppSettingContext.Consumer>
);

export default ConsumedSideDrawer;
