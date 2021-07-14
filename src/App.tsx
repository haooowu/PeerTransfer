import React from 'react';
import HelloWorld from 'src/components/HelloWorld';
import IdentityProvider from 'src/providers/IdentityProvider';
import {useAppTheme} from 'src/hooks';
import StyledToastContainer from 'src/styles/StyledToastContainer';
import theme, {brightnessTheme} from 'src/styles/theme';
import {ThemeProvider} from 'styled-components';
import MuiThemeProvider from '@material-ui/styles/ThemeProvider';
import {createTheme} from '@material-ui/core/styles';

import 'src/App.css';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  // TODO-sprint: update setting and themes provider

  const {appTheme} = useAppTheme();

  const MuiAppTheme = createTheme({
    palette: {
      primary: {main: brightnessTheme[appTheme].primary.main},
      secondary: {main: brightnessTheme[appTheme].secondary.light},
    },
  });

  return (
    <IdentityProvider>
      <ThemeProvider
        theme={{
          ...theme,
          ...brightnessTheme[appTheme],
        }}
      >
        <MuiThemeProvider theme={MuiAppTheme}>
          <HelloWorld />
          <StyledToastContainer
            position="top-right"
            autoClose={5000}
            pauseOnFocusLoss={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
          />
        </MuiThemeProvider>
      </ThemeProvider>
    </IdentityProvider>
  );
};

export default App;
