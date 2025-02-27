import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { IdentityContext, IIdentityContextVariable } from "src/providers/IdentityProvider";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";

import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GitHubIcon from "@mui/icons-material/GitHub";
import HelpIcon from "@mui/icons-material/Help";
import CloudIcon from "@mui/icons-material/CloudDownloadSharp";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import ChatIcon from "@mui/icons-material/Chat";
import ChatOffIcon from "@mui/icons-material/SpeakerNotesOff";
import LightBrightnessIcon from "@mui/icons-material/Brightness7";
import DarkBrightnessIcon from "@mui/icons-material/Brightness4";
import { IAppSettingContextVariable } from "src/providers/AppSettingProvider";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import { ELE_PUBLIC_ID, ELE_PUBLIC_ID_WRAPPER } from "src/constants";
import { ListItemButton } from "@mui/material";

const StyledListItemIcon = styled(ListItemIcon)`
  margin-right: -16px;
  color: ${(props) => props.theme.primary.contrastText} !important;
`;

const StyledListItem = styled(ListItem)<{ $isOpen: boolean }>`
  margin-top: 4px;
  justify-content: space-between !important;
  line-height: 1.5em;
  cursor: pointer;
  padding: 0.5em 1em;
  font-size: 14px;
  text-align: left;
  padding-bottom: 1em;
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  * {
    pointer-events: none;
    cursor: pointer;
  }
  span {
    font-weight: 300;
  }
  input {
    min-width: 200px;
    pointer-events: auto;
    color: ${(props) => props.theme.primary.contrastText};
  }
`;

const StyledList = styled(List)`
  margin-top: auto !important;
`;

interface Props extends IAppSettingContextVariable {
  drawerOpen: boolean;
  handleJoinRoomModalOpen: () => void;
  handleAboutModalOpen: () => void;
}

interface IDrawerOptionList extends Props {
  publicID: string;
}

const DrawerOptionList: React.FC<IDrawerOptionList> = ({
  publicID,
  drawerOpen,
  shouldAutoAccept,
  shouldAutoDownload,
  appTheme,
  toggleAutoAccept,
  toggleAutoDownload,
  toggleLightDarkTheme,
  handleJoinRoomModalOpen,
  handleAboutModalOpen,
}) => {
  const handleCopyPublicID = async (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(publicID);
      toast.dismiss();
      toast.info("Room Id copied", {
        autoClose: 3000,
      });
    } catch {
      (document.getElementById(ELE_PUBLIC_ID) as HTMLInputElement).select();
    }
  };

  const handleSourceRedirect = () => window.open("https://github.com/haooowu/PeerTransfer");

  return (
    <>
      <List>
        <Tooltip title={"Auto Accept"} placement="right">
          <ListItemButton onClick={toggleAutoAccept}>
            <StyledListItemIcon>{shouldAutoAccept ? <ChatIcon /> : <ChatOffIcon />}</StyledListItemIcon>
            <ListItemText primary={"Auto Accept Request"} />
            <Switch checked={shouldAutoAccept} color="secondary" inputProps={{ "aria-label": "checkbox" }} />
          </ListItemButton>
        </Tooltip>

        <Tooltip title={"Auto Download"} placement="right">
          <ListItemButton onClick={toggleAutoDownload}>
            <StyledListItemIcon>{shouldAutoDownload ? <CloudIcon /> : <CloudOffIcon />}</StyledListItemIcon>
            <ListItemText primary={"Auto Download File"} />
            <Switch checked={shouldAutoDownload} color="secondary" inputProps={{ "aria-label": "checkbox" }} />
          </ListItemButton>
        </Tooltip>
      </List>

      <Divider />

      <List>
        <Tooltip title="Brightness Theme" placement="right">
          <ListItemButton onClick={toggleLightDarkTheme}>
            <StyledListItemIcon>
              {appTheme === "light" ? <LightBrightnessIcon /> : <DarkBrightnessIcon />}
            </StyledListItemIcon>
            <ListItemText primary={"Light / Dark Theme"} />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Join Another Room" placement="right">
          <ListItemButton onClick={handleJoinRoomModalOpen}>
            <StyledListItemIcon>
              <AccountTreeIcon />
            </StyledListItemIcon>
            <ListItemText primary={"Join a room"} />
          </ListItemButton>
        </Tooltip>
      </List>

      <Divider />

      <List>
        <Tooltip title="Copy Current Room ID" placement="right">
          <StyledListItem id={ELE_PUBLIC_ID_WRAPPER} $isOpen={drawerOpen} onClick={(e) => handleCopyPublicID(e)}>
            <div>
              <span>Room ID:</span>
              <br />
              <InputBase id={ELE_PUBLIC_ID} value={publicID} inputProps={{ "aria-label": "naked" }} />
            </div>
            <StyledListItemIcon>
              <FileCopyOutlinedIcon />
            </StyledListItemIcon>
          </StyledListItem>
        </Tooltip>
      </List>

      <StyledList>
        <Tooltip title="About" placement="right">
          <ListItemButton onClick={handleAboutModalOpen}>
            <StyledListItemIcon>
              <HelpIcon />
            </StyledListItemIcon>
            <ListItemText primary={"About"} />
          </ListItemButton>
        </Tooltip>
        <Tooltip title="Source Code" placement="right">
          <ListItemButton onClick={handleSourceRedirect}>
            <StyledListItemIcon>
              <GitHubIcon />
            </StyledListItemIcon>
            <ListItemText primary={"Source"} />
          </ListItemButton>
        </Tooltip>
      </StyledList>
    </>
  );
};

const ConsumedDrawerOptionList = (props: Props) => (
  <IdentityContext.Consumer>
    {({ publicID }: IIdentityContextVariable) => <DrawerOptionList publicID={publicID} {...props} />}
  </IdentityContext.Consumer>
);

export default ConsumedDrawerOptionList;
