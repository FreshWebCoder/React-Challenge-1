import { useState } from 'react';
import type { MouseEvent } from 'react';

import type { RotationType } from './types';

import logo from './logo.svg';
import './App.css';

const minIconHeight = Math.min(window.innerHeight, window.innerWidth) * 0.1;
const maxIconHeight = Math.min(window.innerHeight, window.innerWidth) * 0.5;
const ratio = (maxIconHeight - minIconHeight) / (window.innerHeight + window.innerWidth);

function App() {
  const [height, setHeight] = useState<number>(maxIconHeight);
  const [rotation, setRotation] = useState<RotationType>('normal');

  const onClickIcon = () => {
    setRotation(rotation === 'normal' ? 'reverse' : 'normal');
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setHeight(minIconHeight + (e.clientX + e.clientY) * ratio);
  };

  return (
    <div className="App" onMouseMove={onMouseMove}>
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ animationDirection: rotation, height }}
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
