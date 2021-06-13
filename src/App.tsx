import React from 'react';
import styled from 'styled-components';
import HelloWorld from 'src/components/HelloWorld';
import logo from 'src/assets/logo.svg';
import 'src/App.css';

const Wrapper = styled.div`
  text-align: center;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <HelloWorld />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </Wrapper>
  );
};

export default App;
