import { styled, Theme, CSSObject } from "@mui/material/styles";
import appTheme from "src/styles/theme";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

const openedMixin = (theme: Theme): CSSObject => ({
  width: appTheme.drawerMaxWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: appTheme.drawerMinWidth,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme }) => ({
  flexShrink: 0,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    overflowX: "hidden",
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": {
          ...openedMixin(theme),
        },
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": {
          ...closedMixin(theme),
        },
      },
    },
  ],
}));

export const TitleText = styled(Box)(() => ({
  fontSize: 22,
  position: "absolute",
  left: 16,
}));

export const TitleBar = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  height: 60,
  justifyContent: "flex-end",
}));

export default Drawer;
