import React from 'react';
import IdentityLayout from 'src/IdentityLayout';
import IdentityProvider from 'src/providers/IdentityProvider';
import AppSettingProvider, {AppSettingContext, IAppSettingContextVariable} from 'src/providers/AppSettingProvider';
import StyledToastContainer from 'src/styles/styled-components/StyledToastContainer';
import theme, {brightnessTheme} from 'src/styles/theme';
import {ThemeProvider} from 'styled-components';
import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import {createTheme} from '@material-ui/core/styles';

import 'src/App.css';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  appTheme: 'light' | 'dark';
}

const AppContent: React.FC<Props> = ({appTheme}) => {
  const MuiAppTheme = createTheme({
    palette: {
      primary: {
        main: brightnessTheme[appTheme].primary.main,
        dark: brightnessTheme[appTheme].primary.dark,
      },
      secondary: {main: brightnessTheme[appTheme].secondary.main},
    },
  });

  return (
    <ThemeProvider
      theme={{
        ...theme,
        ...brightnessTheme[appTheme],
      }}
    >
      <MuiThemeProvider theme={MuiAppTheme}>
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
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

const App = () => (
  <IdentityProvider>
    <AppSettingProvider>
      <AppSettingContext.Consumer>
        {({appTheme}: IAppSettingContextVariable) => <AppContent appTheme={appTheme} />}
      </AppSettingContext.Consumer>
    </AppSettingProvider>
  </IdentityProvider>
);

export default App;
