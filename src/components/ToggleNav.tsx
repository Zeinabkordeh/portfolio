import React, { useState } from 'react';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import '../css/ToggleNav.css';
import { Link } from 'react-router-dom';

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
            <div className="closeIcon">
                <RiMenuUnfoldFill onClick={closeNav} />
            </div>
            <div className="nav-menu">
            <ul>
                <li>
                    <Link to="/direct=true" >Home</Link>
                </li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            </div>
        </>
      )}
    </div>
  );
};

export default ToggleNav;
