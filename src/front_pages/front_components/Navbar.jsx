import React from 'react';
import { Link as ScrollLink, scroller } from 'react-scroll';
import styled from 'styled-components';
import {
  IconButton, Menu, MenuButton, MenuList, MenuItem, Text,
} from '@chakra-ui/react';
import Logo from '../../Icon_components/Logo';
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { navbarLabels } from '../../data/navbarLabels';

const FNBContainer = styled.div`
  position: absolute;
  --bg-color: #FEF9D1;
  --text-color: #ff8c00 ;  
  width: 100%;
  z-index: 10;

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
    }

    .nav-list {
      font-weight: bold;
      font-size: 1.5rem; 
      column-gap: 1.2rem;          
    }

    .nav-menu-hide{
      display: none;
    }
  } 

  @media screen and (max-width: 769px) {    

    .nav-list {
      display: none;
    }
  }    

  @media screen and (min-width: 1024px) {}

`

const Navbar = () => {
  const goToPosition = (item) => {
    scroller.scrollTo(item, {
      duration: 900,
      delay: 2,
      smooth: 'easeInOutQuart',
      spy: true,
    })
  }


  return (
    <FNBContainer>
      <nav className="nav-main">
        <div className='nav-logo'>
          <Logo />
        </div>
        <ul className="nav-list">
          {navbarLabels.map((item) => {
            return (
              <li key={item.title} className="nav-item">
                <ScrollLink
                  activeClass="active"
                  to={item.link}
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  className="nav-link"
                >
                  <Text
                    color="orange.400"
                    textShadow='0 0 10px purple.400'>
                    {item.title}
                  </Text>
                </ScrollLink>
              </li>
            )
          })}
        </ul>
        <div className="nav-menu-hide">
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  mr={2.5}
                  isActive={isOpen}
                  transition='all 0.9s'
                  as={IconButton}
                  aria-label='Options'
                  color='orange.400'
                  bgColor='rgba(255,255,255,0.95)'
                  icon={isOpen ? (<SmallCloseIcon />) : (<HamburgerIcon />)}
                >
                </MenuButton>
                <MenuList bgColor='rgba(255,255,255,0.6)'>
                  {navbarLabels.map((item) => {
                    return (
                      <MenuItem
                        key={item.title}
                        m='0 auto'
                        p='13px 40px'
                        onClick={() => goToPosition(item.link)}
                      >
                        <Text
                          fontSize="xl"
                          color="orange.500"
                        >
                          {item.title}
                        </Text>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </>
            )}
          </Menu>
        </div>
      </nav>
    </FNBContainer>
  );
};

export default Navbar;
