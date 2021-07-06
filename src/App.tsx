import React from 'react';
import {ToastContainer} from 'react-toastify';
import HelloWorld from 'src/components/HelloWorld';
import IdentityProvider from 'src/components/IdentityProvider';
import {ThemeProvider} from 'styled-components';
import theme, {brightnessTheme} from 'src/styles/theme';

import 'src/App.css';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer position="top-right" autoClose={5000} newestOnTop={false} closeOnClick rtl={false} draggable />
      </ThemeProvider>
    </IdentityProvider>
  );
};

export default App;
