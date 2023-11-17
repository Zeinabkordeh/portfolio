import React, { useEffect, useState } from 'react';
import AboutSection from './components/AboutSection';
import ColorModeSwitch from './components/ColorModeSwitch';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import LandingPage from './components/LandingPage';
import ProjectSection from './components/ProjectSection';
import './css/App.css';

type AppProps = {};

const App: React.FC<AppProps> = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const toggleCursor = () => {
      setIsDesktop(window.innerWidth >= 800);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector<HTMLElement>('.app-cursor');
      if (cursor) {
        cursor.setAttribute(
          'style',
          `top: ${e.pageY - 10}px; left: ${e.pageX - 10}px;`
        );
      }
    };

    const handleMouseClick = () => {
      const cursor = document.querySelector<HTMLElement>('.app-cursor');
      if (cursor) {
        cursor.classList.add('expand');
        setTimeout(() => {
          cursor.classList.remove('expand');
        }, 500);
      }
    };

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleMouseClick);

    // Initial setup
    toggleCursor();

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <>
      {isDesktop && <div className="app-cursor"></div>}
      <ColorModeSwitch />
      <LandingPage />
      <ProjectSection />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </>
  );
};

export default App;
