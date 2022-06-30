import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Logo from "../Logo";

const Nav = styled.nav`
padding: 10px;
display: flex;
background-color: yellow;

ul {
  display: flex;
  list-style: none;
  justify-content: space-between;

  li {
    margin: 4px;
    padding: 0 20px;
    .link-style {
      text-decoration: none;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
}
`

const PanelNavbar = () => {
  const [user] = useAuthState(auth);
  return (
    <Nav>
      <Logo />
      <h1>Admin Panel</h1>
      <div>
        <ul>
          <li><Link to="/panel" className="link-style">Home</Link></li>
          <li><Link to="/skills-list" className="link-style">Skills</Link></li>
          <li><Link to="/projects-list" className="link-style">Projects</Link></li>
          {user && (
            <>
              <li>
                <span className="">Signed is as {user.displayName || user.email}</span>
                <button className="" onClick={() => { signOut(auth) }}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </Nav>
  )
}

export default PanelNavbar;