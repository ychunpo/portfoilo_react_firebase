import React, { useState } from 'react';
import { Text } from '@chakra-ui/react';
import styled from 'styled-components';
import Logo from '../../Icon_components/Logo';
import { NavbarIcon } from '../../Icon_components/NavbarIcon';

const NavBarContainer = styled.div`
  position: absolute;
  --bg-color: #003366;
  --text-color: #ff8c00 ;  
  width: 100%;
  z-index: 1;

  .nav-main {
    display: flex;
    justify-content: space-between;    
    align-items: center;    
  }

  .nav-list {    
    display: flex;
    margin-inline-end: 1rem;   
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
      column-gap: 1.2rem;          
    }

    .nav-link {
      
    }
  } 

  @media screen and (max-width: 769px) {
    .nav-menu-hide {
      position: fixed;
      top: 0;
      left: 0;
      right: -500%;
      margin: 0 auto;
      border-radius: 1.5rem;
      background-color: var(--bg-color);
      
      padding-top: 3rem;
      padding-bottom: 3rem;
      width: 90%;
      transition: 1s;      
    }

    .nav-menu-show {
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
      font-size: 1.2rem;
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
  }

  return (
    <NavBarContainer>
      <nav className="nav-main">
        <Logo />
        <div className={show ? "nav-menu-show" : "nav-menu-hide"}>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#introductionId" className="nav-link">
                <Text
                  color="orange.400"
                  textShadow='0 0 10px purple.400'>
                  Introduction
                </Text>
              </a>
            </li>
            <li className="nav-item">
              <a href="#aboutId" className="nav-link">
                <Text
                  color="orange.400"
                  textShadow='0 0 10px purple.400'>
                  About
                </Text>
              </a>
            </li>
            <li className="nav-item">
              <a href="#portfolioId" className="nav-link">
                <Text
                  color="orange.400"
                  textShadow='0 0 10px purple.400'>
                  Portfolio
                </Text>
              </a>
            </li>
            <li className="nav-item">
              <a href="#skillsId" className="nav-link">
                <Text
                  color="orange.400"
                  textShadow='0 0 10px purple.400'>
                  Skills
                </Text>
              </a>
            </li>
            <li className="nav-item">
              <a href="#contactId" className="nav-link">
                <Text
                  color="orange.400"
                  textShadow='0 0 10px purple.400'>
                  Contact
                </Text>
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-toggle" onClick={showSidebar} >
          <NavbarIcon />
        </div>
      </nav>
    </NavBarContainer >
  );
};

export default Navbar;
