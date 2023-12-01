import React, { useEffect, useState } from 'react';
import '../css/TextTransition.css'; 
import ToggleNav from './ToggleNav';

const AnimatedHeading: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };

}, []);


  return (
    <div className='topHeader' id='topHeader'>
        <ToggleNav/>
        <img className={`logo-style ${isVisible ? 'visible' : ''}`} src="/image/logo.svg" alt="logo" />
        <h1 className={`animated-heading ${isVisible ? 'visible' : ''}`}>
        Welcome
        </h1>
        <p className={`additional-text ${isVisible ? 'visible' : ''}`}>
        Explore my portfolio to witness the fusion of cutting-edge development and eye-catching design.</p>
    </div>
  );
};

export default AnimatedHeading;
