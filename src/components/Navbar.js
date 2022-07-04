import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';
import { FaBarIcon } from './NavbarItem';

const Header = styled.div`
  --bg-color: #dedbf3;
  --text-color: #141e27;

  position: fixed;   
  padding: 5px;
  width: 100%;
  background-color: var(--bg-color);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .container { 
    
  }

  .nav {
    display: flex;
    justify-content: space-between;    
    align-items: center;    
  }

  .nav-list {    
    display: flex;
    margin-inline-end: 4rem;   
  }

  .nav-item {
    display: flex;
    justify-content: center;
    margin: 0 5px;
    padding: 0 5px;    
  }
  
  .nav-link {
    text-decoration: none;
    
    cursor: pointer;
    color: var(--text-color);
  }

  .nav-toggle {
    font-size: 1.5rem;
    cursor: pointer;        
  }  

  @media screen and (min-width: 769px) {
    .nav {
      height: 5rem;
    }

    .nav-toggle {
      display: none;
    }

    .nav-list {
      font-weight: bold;
      font-size: 1.5rem; 
      column-gap: 2rem;      
    }
  } 

  @media screen and (max-width: 768px) {
    .nav-menu-hide {
      position: fixed;
      top: 0;
      left: 0;
      right: -500%;
      margin: 0 auto;
      border-radius: 1.5rem;
      background-color: var(--bg-color);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
      padding-top: 3rem;
      padding-bottom: 3rem;
      width: 90%;
      transition: 1s;
      
    }

    .nav-menu {
      position: fixed;
      top: 9%;
      left: 0;
      right: -75%;
      margin: 0 auto;
      border-radius: 1.5rem;
      background-color: var(--bg-color);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
      padding-top: 3rem;
      padding-bottom: 3rem;
      width: 20%;
      transition: 1s;           
    }

    .nav-list {
      margin: auto;
      font-size: 1.5rem;
      display: flex;      
      flex-direction: column;          
      row-gap: 2.5rem;      
    }

    .nav-item {
      display: flex;
      justify-content: center;
    }
  }    

  @media screen and (min-width: 1024px) {
  .container {
    margin-inline: auto;
  }  
`


const Navbar = () => {
  const [show, setShow] = useState(false);

  const showSidebar = () => {
    setShow(!show);
    console.log(show);
  }

  return (
    <Header>
      <nav className="nav container">
        <Logo />
        <div className={show ? "nav-menu" : "nav-menu-hide"}>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/portfolio" className="nav-link">Portfolio</Link>
            </li>
            <li className="nav-item">
              <Link to="/skills" className="nav-link">Skills</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="nav-toggle" onClick={showSidebar} >
          <FaBarIcon />
        </div>

      </nav>
    </Header >
  );
};

export default Navbar;
