import React from 'react';
import { HashLink, NavHashLink } from 'react-router-hash-link';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DevicesIcon from '@mui/icons-material/Devices';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import '../css/NavBar.css';
import Logo from '../utils/logo';


function NavBar() {
  return (
    <nav className="navbar">
      <HashLink smooth  to="/#landing-section">
      <Logo/>
      </HashLink>

      <ul>
        <li>
          <HashLink smooth to="/#landing-section">
            <div className="nav-button">
              <HomeIcon />
              <p>Home</p>
            </div>
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/#project-section">
            <div className="nav-button">
              <DevicesIcon />
              <p>Projects</p>
            </div>
          </HashLink>
        </li>
        <li>
          <HashLink smooth to="/#about-section">
            <div className="nav-button">
              <PersonIcon />
              <p>About</p>
            </div>
          </HashLink>
        </li>

        <li>
          <HashLink smooth to="/#contact-section">
            <div className="nav-button">
              <AlternateEmailIcon />
              <p>Contact</p>
            </div>
          </HashLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
