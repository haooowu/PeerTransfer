import MuiPopper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import { Modifier } from "@popperjs/core";

const Popper = styled(MuiPopper)(({ theme }) => ({
  zIndex: 99,
  "& > div": {
    position: "relative",
  },
  '&[data-popper-placement*="bottom"]': {
    "& > div": {
      marginTop: 0,
    },
    "& .MuiPopper-arrow": {
      top: 0,
      left: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent ${theme.palette.primary.dark} transparent`,
      },
    },
  },
  '&[data-popper-placement*="top"]': {
    "& > div": {
      marginBottom: 0,
    },
    "& .MuiPopper-arrow": {
      bottom: 0,
      left: 0,
      marginBottom: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "1em 1em 0 1em",
        borderColor: `${theme.palette.primary.dark} transparent transparent transparent`,
      },
    },
  },
  '&[data-popper-placement*="right"]': {
    "& > div": {
      marginLeft: 0,
    },
    "& .MuiPopper-arrow": {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${theme.palette.primary.dark} transparent transparent`,
      },
    },
  },
  '&[data-popper-placement*="left"]': {
    "& > div": {
      marginRight: 0,
    },
    "& .MuiPopper-arrow": {
      right: 0,
      marginRight: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 0 1em 1em",
        borderColor: `transparent transparent transparent ${theme.palette.primary.dark}`,
      },
    },
  },
}));

export const Arrow = styled("div")({
  position: "absolute",
  fontSize: 7,
  width: "3em",
  height: "3em",
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
});

export const commonPopperModifiers: Partial<Modifier<unknown, object>>[] = [
  {
    name: "flip",
    enabled: true,
    options: {
      altBoundary: true,
      rootBoundary: true,
      padding: 8,
    },
  },
  {
    name: "preventOverflow",
    enabled: true,
    options: {
      altAxis: true,
      altBoundary: true,
      tether: true,
      rootBoundary: "document",
    },
  },
];

export default Popper;
