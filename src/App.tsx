import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { IntervalIdType, RotationType } from './types';

import logo from './logo.svg';
import './App.css';

const minIconHeight = Math.min(window.innerHeight, window.innerWidth) * 0.1;
const maxIconHeight = Math.min(window.innerHeight, window.innerWidth) * 0.5;
const ratio = (maxIconHeight - minIconHeight) / (window.innerHeight + window.innerWidth);

function App() {
  const [height, setHeight] = useState<number>(maxIconHeight);
  const [rotation, setRotation] = useState<RotationType>('normal');
  const [openedTime, setOpenedTime] = useState<number>(0);
  const [idleTime, setIdleTime] = useState<number>(0);
  const intervalIdRef = useRef<IntervalIdType>({
    opened: null,
    idle: null,
  });

  useEffect(() => {
    startOpenedInterval();

    return () => {
      clearOpenedInterval();
      clearIdleInterval();
    }
  }, []);

  const startOpenedInterval = () => {
    intervalIdRef.current.opened = setInterval(() => {
      setOpenedTime((prevVal) => prevVal + 1)
    }, 1000);
  };

  const clearOpenedInterval = () => {
    if (intervalIdRef.current.opened) {
      clearInterval(intervalIdRef.current.opened);
      intervalIdRef.current.opened = null;
    }
  };

  const startIdleInterval = () => {
    intervalIdRef.current.idle = setInterval(() => {
      setIdleTime((prevVal) => prevVal + 1)
    }, 1000);
  };

  const clearIdleInterval = () => {
    if (intervalIdRef.current.idle) {
      clearInterval(intervalIdRef.current.idle);
      intervalIdRef.current.idle = null;
    }
  };

  const onClickIcon = () => {
    setRotation(rotation === 'normal' ? 'reverse' : 'normal');
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setHeight(minIconHeight + (e.clientX + e.clientY) * ratio);

    clearIdleInterval();
    startIdleInterval();
  };

  return (
    <div
      className="App"
      onMouseMove={onMouseMove}
      onMouseOver={startIdleInterval}
      onMouseOut={clearIdleInterval}
    >
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ animationDirection: rotation, height }}
          onClick={onClickIcon}
        />
        
        <p>
          This Page has been Opened for {openedTime} seconds
        </p>
        <p>
          Idle time is {idleTime} seconds
        </p>
      </header>
    </div>
  );
}

export default App;
