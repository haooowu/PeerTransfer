import React from 'react';
import HelloWorld from 'src/components/HelloWorld';
import IdentityProvider from 'src/components/IdentityProvider';
import 'src/App.css';

const App: React.FC = () => {
  return (
    <IdentityProvider>
      <HelloWorld />
    </IdentityProvider>
  );
};

export default App;
