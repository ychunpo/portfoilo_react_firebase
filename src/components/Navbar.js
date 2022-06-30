import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';

const Nav = styled.nav`
background-color: yellow;
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
      .link-style {
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
            <Link to="/" className="link-style">Home</Link>
          </li>
          <li>
            <Link to="/about" className="link-style">About</Link>
          </li>
          <li>
            <Link to="/portfolio" className="link-style">Portfolio</Link>
          </li>
          <li>
            <Link to="/skills" className="link-style">Skills</Link>
          </li>
          <li>
            <Link to="/contact" className="link-style">Contact</Link>
          </li>
        </ul>
      </div>
    </Nav>
  );
};

export default Navbar;
