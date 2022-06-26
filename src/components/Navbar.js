import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const Nav = styled.nav`
background-color: black;
margin: 0;
padding: 5px;
display: flex;
justify-content: space-between;

.container {  
  margin: 0 30px;  

  ul {
    display: flex;
    list-style: none;
    gap: 3rem;
        
    li {
      margin: 0 5px;
      padding: 0 5px;
      display:inline;
      a {
        text-decoration: none;
        font-weight: bold;
        font-size: 1.5rem;
        color: red;
      }
    }
  }
}
`

const Navbar = () => {
  return (
    <Nav>
      <Logo />
      <div className="container">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/portfolio">Portfolio</a>
          </li>
          <li>
            <a href="/skill">Skill</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </Nav>
  );
};

export default Navbar;
