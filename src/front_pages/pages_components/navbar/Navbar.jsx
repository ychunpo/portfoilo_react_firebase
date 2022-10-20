import React, { useState } from 'react';


import './navbar.css';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <header className={`header ${dark ? 'dark-theme' : ''}  `}>
      <nav className="nav container">
        <a href="#logo" className="nav-logo">Navbar</a>

        <div className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link">Home</a>
            </li>
            <li className={`nav-item ${show ? 'show' : ''}`}>
              <a href="#services" className="nav-link">Services</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact</a>
            </li>

            <i onClick={() => setDark(!dark)} class='fa fa-toggle-on'></i>
          </ul>
        </div>

        <div className="nav-toggle" onClick={() => setShow(!show)}>
          <i class="fas fa-bars"></i>
        </div>
      </nav>
    </header>
  )
}

export default Navbar;