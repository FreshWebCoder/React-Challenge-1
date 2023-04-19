import { useState } from 'react';

import type { RotationType } from './types';

import logo from './logo.svg';
import './App.css';

function App() {
  const [rotation, setRotation] = useState<RotationType>('normal');

  const onClickIcon = () => {
    setRotation(rotation === 'normal' ? 'reverse' : 'normal');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ animationDirection: rotation }}
          onClick={onClickIcon}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
