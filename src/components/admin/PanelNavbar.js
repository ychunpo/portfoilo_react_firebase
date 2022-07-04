import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Logo from "../Logo";

const Nav = styled.nav`
  margin: 0;
  padding: 10px;
  display: flex;
  justify-content: start;
  background-color: yellow;
  

  ul {    
    display: flex;   
    list-style: none;
    justify-content: space-between;

    li {
      margin: 0;
      padding: 3px 20px;
      .link-style {
        text-decoration: none;
        font-weight: bold;
        font-size: 1.5rem;
      }
    }
  
  .btn-style {
    font-size: 1.5rem;
    
  }
  
}
`

const PanelNavbar = () => {
  const [user] = useAuthState(auth);
  return (
    <Nav>
      <Logo />
      <div>
        <h1>Admin Panel</h1>
      </div>
      <div>
        <ul>
          <li><Link to="/panel" className="link-style">Home</Link></li>
          <li><Link to="/skills-list" className="link-style">Skills</Link></li>
          <li><Link to="/projects-list" className="link-style">Projects</Link></li>
          {user && (
            <>
              <li>
                <input type="submit" className="btn-style" value="Logout" onClick={() => { signOut(auth) }} />
              </li>
            </>
          )}
        </ul>
      </div>
    </Nav>
  )
}

export default PanelNavbar;