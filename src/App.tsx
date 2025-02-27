import React from "react";
import IdentityLayout from "src/IdentityLayout";
import IdentityProvider from "src/providers/IdentityProvider";
import AppSettingProvider, { AppSettingContext, IAppSettingContextVariable } from "src/providers/AppSettingProvider";
import StyledToastContainer from "src/styles/styled-components/StyledToastContainer";
import theme, { brightnessTheme } from "src/styles/theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { ErrorBoundary } from "react-error-boundary";

import "src/App.css";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  appTheme: "light" | "dark";
}

const AppContent: React.FC<Props> = ({ appTheme }) => {
  const MuiAppTheme = createTheme({
    palette: {
      primary: {
        main: brightnessTheme[appTheme].primary.main,
        dark: brightnessTheme[appTheme].primary.dark,
      },
      secondary: { main: brightnessTheme[appTheme].secondary.main },
    },
  });

  return (
    <StyledThemeProvider
      theme={{
        ...theme,
        ...brightnessTheme[appTheme],
      }}
    >
      <MuiThemeProvider theme={MuiAppTheme}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <IdentityLayout />
          <StyledToastContainer
            position="top-right"
            autoClose={5000}
            pauseOnFocusLoss={false}
            newestOnTop={false}
            closeOnClick
            hideProgressBar
            rtl={false}
            draggable
          />
        </ErrorBoundary>
      </MuiThemeProvider>
    </StyledThemeProvider>
  );
};

const App = () => (
  <IdentityProvider>
    <AppSettingProvider>
      <AppSettingContext.Consumer>
        {({ appTheme }: IAppSettingContextVariable) => <AppContent appTheme={appTheme} />}
      </AppSettingContext.Consumer>
    </AppSettingProvider>
  </IdentityProvider>
);

export default App;
