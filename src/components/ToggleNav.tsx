import React, { useState } from 'react';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import '../css/ToggleNav.css';
import { Link } from 'react-router-dom';
import { Icon } from '@chakra-ui/react';
import { GrGithub, GrLinkedinOption, GrMail } from 'react-icons/gr';

const ToggleNav: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className={`toggle-nav-container ${isNavOpen ? 'nav-open' : ''}`}>
      <div className="toggle-button" onClick={isNavOpen ? closeNav : toggleNav}>
        <RiMenuFoldFill onClick={toggleNav} />
      </div>
      {isNavOpen && (
        <>
            <section className="closeIcon">
                <RiMenuUnfoldFill onClick={closeNav} />
            </section>
            <section className="nav-menu">
              <div className='media-icons'>
                <p className='moto-navbar'> Let’s create your online success together. </p>
                <div className='icon-media-taggle'>
                  <a href="https://www.linkedin.com/in/zeinabkordeh/">
                  <Icon className='media-icon' as={GrLinkedinOption} boxSize={6}/>
                  </a>
                  <a href="mailto:your.email@example.com">
                  <Icon className='media-icon' as={GrMail} boxSize={6}/>
                  </a>
                  <a href="https://github.com/Zeinabkordeh">
                  <Icon className='media-icon' as={GrGithub}boxSize={6}/>
                  </a>
                </div>
              </div>
              <ul>
                  <li>
                  <Link to="/?direct=true" >Home</Link>
                  </li>
                  <li>
                    <Link to="/projects" >Projects</Link>
                  </li>
              </ul>
              
            </section>
        </>
      )}
    </div>
  );
};

export default ToggleNav;
