import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import type { FeatureStatusType, IntervalIdType, RotationType } from './types';

import { ReactComponent as IconHamburger } from './icons/icon-hamburger.svg';
import { ReactComponent as IconClose } from './icons/icon-close.svg';
import logo from './icons/logo.svg';

import './App.css';

const minIconHeight = Math.min(window.innerHeight, window.innerWidth) * 0.1;
const maxIconHeight = Math.min(window.innerHeight, window.innerWidth) * 0.5;
const ratio = (maxIconHeight - minIconHeight) / (window.innerHeight + window.innerWidth);

function App() {
  const [height, setHeight] = useState<number>(maxIconHeight);
  const [rotation, setRotation] = useState<RotationType>('normal');
  const [openedTime, setOpenedTime] = useState<number>(0);
  const [idleTime, setIdleTime] = useState<number>(0);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [featureStatus, setFeatureStatus] = useState<FeatureStatusType>({
    rotation: true,
    size: true,
    timer: true,
  });
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
    if (featureStatus.rotation) {
      setRotation(rotation === 'normal' ? 'reverse' : 'normal');
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (featureStatus.size) {
      setHeight(minIconHeight + (e.clientX + e.clientY) * ratio);
    }

    if (featureStatus.timer) {
      clearIdleInterval();
      startIdleInterval();
    }
  };

  const onMouseOver = () => {
    if (featureStatus.timer) {
      startIdleInterval();
    }
  };

  const onToggleFeature = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFeatureStatus({
      ...featureStatus,
      [name]: checked,
    });

    if (name === "timer") {
      if (checked) {
        startOpenedInterval();
        startIdleInterval();
      } else {
        clearOpenedInterval();
        clearIdleInterval();
      }
    }
  };

  return (
    <div
      className="App"
      onMouseMove={onMouseMove}
      onMouseOver={onMouseOver}
      onMouseOut={clearIdleInterval}
    >
      <header className="App-header">
        <IconHamburger className="btn-menu" onClick={() => setDrawerOpened(true)} />

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

      <div className={`App-sidebar${drawerOpened ? ' opened' : ''}`}>
        <div className="content">
          <IconClose className="btn-close" onClick={() => setDrawerOpened(false)} />

          <div className="option-row">
            <label htmlFor="rotation-toggler">
              Reverse rotation direction of react icon
            </label>
            <input
              type="checkbox"
              id="rotation-toggler"
              name="rotation"
              checked={featureStatus.rotation}
              onChange={onToggleFeature}
            />
          </div>
          <div className="option-row">
            <label htmlFor="size-toggler">
              Adjust size of react icon
            </label>
            <input
              type="checkbox"
              id="size-toggler"
              name="size"
              checked={featureStatus.size}
              onChange={onToggleFeature}
            />
          </div>
          <div className="option-row">
            <label htmlFor="timer-toggler">
              Start/Stop timers
            </label>
            <input
              type="checkbox"
              id="timer-toggler"
              name="timer"
              checked={featureStatus.timer}
              onChange={onToggleFeature}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
