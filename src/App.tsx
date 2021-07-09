import React from 'react';
import HelloWorld from 'src/components/HelloWorld';
import IdentityProvider from 'src/components/IdentityProvider';
import {ThemeProvider} from 'styled-components';
import theme, {brightnessTheme} from 'src/styles/theme';

import 'src/App.css';
import 'react-toastify/dist/ReactToastify.css';
import StyledToastContainer from 'src/styles/StyledToastContainer';

// TODO-sprint: persist state provider with all the options from drawer in localStorage
const App: React.FC = () => {
  return (
    <IdentityProvider>
      <ThemeProvider
        theme={{
          ...theme,
          ...brightnessTheme.dark,
        }}
      >
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
      </ThemeProvider>
    </IdentityProvider>
  );
};

export default App;
