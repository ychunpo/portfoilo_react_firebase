import React, { useRef, useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import styled from 'styled-components';
import Logo from '../../Icon_components/Logo';
import { NavbarIcon } from '../../Icon_components/NavbarIcon';

const FNBContainer = styled.div`
  position: absolute;
  --bg-color: #FEF9D1;
  --text-color: #ff8c00 ;  
  width: 100%;
  z-index: 50;

  .nav-main {
    display: flex;
    justify-content: space-between;    
    align-items: center;    
  }

  .nav-logo {
    align-self: start;
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
    color: white;      
  }  

  @media screen and (min-width: 769px) {
    .nav {
      height: 5rem;
    }

    .nav-toggle {
      display:none;
      z-index: 9;
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
      right: -200%;
      background-color: var(--bg-color);      
      opacity: 0;
      transition: 2s;
      
      .nav-item {
        opacity: 0;
        transition: 1s;
      }
    }

    .nav-menu-show {
      position: relative;
      top: 51px;      
      right: 31px;
      padding: 2rem 5px;      
      background-color: var(--bg-color);
      box-shadow: 3px 6px 10px rgba(0, 0, 0, 0.3); 
      opacity: 1;    
      transition: 1s;
    }    

    .nav-list {
      margin: auto;
      font-size: 1.2rem;
      display: flex;      
      flex-direction: column;          
      row-gap: 2rem;      
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
  const menuCloseRef = useRef(null);
  const iconRef = useRef(null);

  console.log('menuCloseRef', menuCloseRef.current)

  const showSidebar = () => {
    setShow(!show);
  }

  // const closeSidebar = (e) => {
  //   console.log('e:', e.target)
  //   if (e.target !== menuCloseRef.current) {
  //     setShow(!show);
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("click", closeSidebar);
  //   return () => {
  //     window.removeEventListener("click", closeSidebar);
  //   }
  // }, []);

  return (
    <FNBContainer>
      <nav className="nav-main">
        <div className='nav-logo'>
          <Logo />
        </div>
        <div className="nav-toggle" onClick={showSidebar}>
          <NavbarIcon />
        </div>
        <div className={show ? "nav-menu-show" : "nav-menu-hide"}>
          <ul ref={menuCloseRef} className="nav-list">
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

      </nav>
    </FNBContainer >
  );
};

export default Navbar;
