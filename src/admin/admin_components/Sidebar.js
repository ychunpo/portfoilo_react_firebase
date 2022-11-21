import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import Logo from "../../Icon_components/Logo";
import { sidebarLabels } from "../../data/sidebarLabels";

const Side = styled.div`  
  margin: 0;
  padding: 0;  
  width: 220px;  
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
    margin: 15px 35px; 
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
        <ul className="side-ul">
          {
            sidebarLabels.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <li className="side-li">
                    <Link
                      to={item.link}
                      className="side-link-style"
                    >
                      {item.title}
                    </Link>
                  </li>
                </React.Fragment>
              )
            })
          }
          <hr className="side-hr" />

          <input
            type="submit"
            className="side-btn-style"
            value="Logout"
            onClick={() => { signOut(auth) }}
          />
        </ul>
      </div>
    </Side>
  )
}

export default Sidebar;