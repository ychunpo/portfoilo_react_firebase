import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Logo from "../../Icon_components/Logo";

const Side = styled.div`  
  margin: 0;
  padding: 0;  
  width: 220px;
  height: 100vh; 
  background-color: #FFF8DC;  
  font-family: "Poppins", sans-serif;

  .side-header {    
    padding: 5px 44px; 
  }

  .side-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #909098;
    margin: 15px 10px;    
  }

  .side-hr {
    height: 3px;
    border: 2px solid rgb(230, 227,227);
  }

  .side-column {    
    padding: 0 20px;
  }

  .side-ul {           
    list-style: none;
    margin: 0;
    padding: 0;    

    .side-li {      
      margin: 10px 15px;
      padding: 10px;
      

      .side-link-style {
        color: #571d90;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1rem;
        cursor: pointer;

        &:hover {
          color: #46eb2d;
          background-color: #571d90;
          margin: 0;
          padding: 10px 15px;          
          border: 0;
          border-radius: 10px;
        }
      }      
    }
  
  .side-btn-style {
    border: 0;
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 1.3rem;
    color: white;
    background-color: hsl(19,100%, 79%);

    &:hover {
      color: red;
    }
  }
}
`



const Sidebar = () => {
  return (
    <Side>
      <div className="side-header">
        <Logo />
      </div>
      <div className="side-column">
        <hr className="side-hr" />
        <div className="">
          <ul className="side-ul">
            <p className="side-title">Main</p>
            <li className="side-li">
              <Link to="/admin/dashboard" className="side-link-style">
                Dashboard
              </Link>
            </li>
            <hr className="side-hr" />
            <p className="side-title">Lists</p>
            <li className="side-li">
              <Link to="/admin/skills" className="side-link-style">
                Skills
              </Link>
            </li>
            <li className="side-li">
              <Link to="/admin/projects" className="side-link-style">
                Projects
              </Link>
            </li>
            <hr className="side-hr" />
            <p className="side-title">Setting</p>
            <li className="side-li">
              <Link to="/admin/sidebar" className="side-link-style">
                Sidebar
              </Link>
            </li>
            <hr className="side-hr" />
            <li className="side-li">
              <input type="submit" className="side-btn-style" value="Logout" onClick={() => { signOut(auth) }} />
            </li>
          </ul>
        </div>
      </div>
    </Side>
  )
}

export default Sidebar;