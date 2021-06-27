import React from 'react';
import {ToastContainer} from 'react-toastify';
import HelloWorld from 'src/components/HelloWorld';
import IdentityProvider from 'src/components/IdentityProvider';

import 'src/App.css';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <IdentityProvider>
      <HelloWorld />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </IdentityProvider>
  );
};

export default App;
