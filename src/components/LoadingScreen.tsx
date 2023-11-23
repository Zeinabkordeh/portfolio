import React from 'react';
import '../css/LoadingScreen.css';
import '../css/LandingPage.css';
import { useTheme } from '../utils/themeContext';

const LoadingScreen: React.FC = () => {
  const { theme } = useTheme();

  const gradientStyle: React.CSSProperties = {
    fontWeight: 'bold',
    // background: `radial-gradient(circle, ${theme.secondaryColor} 16%, ${theme.primaryColor} 35%, ${theme.primaryColor} 61%, ${theme.secondaryColor} 100%)`,
    backgroundClip: 'text',
    // color: 'transparent' ,
    color: theme.secondaryColor,
    textTransform: 'uppercase' as 'uppercase',
    fontSize: '3rem',
    filter: 'brightness(70%)',
    margin: '10px 0',
    zIndex: -1,
    backgroundSize: ' 200% 100% ',
    animation: ' gradientMove 8s linear infinite',
  };

  return (
    <>

      <section className="landing-page" id='landing-section'>
        <div className='overal'>
          <h4 className="name" style={gradientStyle}>Zeinab Kordeh</h4>
        </div>
        <div className='overal' id="description" style={{ color: theme.primaryColor, filter: 'brightness(55%)' }}>
          <p className="job-title">a digital designer and creative developer.</p>
        </div>
      </section>
    </>
  );
};

export default LoadingScreen;
