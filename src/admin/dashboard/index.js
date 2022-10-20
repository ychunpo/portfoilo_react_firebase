import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../../utils/firebase";
//import DropForm from "./HookFormDropZone/DropForm";
import Form from "./HookFormDropZone2/Form";


const Container = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;  
  text-align: center;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;  

  .main {
    padding: 5px 0;
    width: 100%;   
    background-color: rgb(245, 245, 245);
  }

  .header { 
    margin: 5px;
    padding: 5px;
  }

  .title {
    
  }

  hr {
    margin: 5px;
  }

  .content {
    
  }
`

const ControlPanel = () => {
  const [user] = useAuthState(auth);

  return (
    <Container>
      {!user ? (
        <>
          <h2>
            <Link to="/auth">Go To Login!</Link>
          </h2>
        </>
      ) : (
        <>
          <div className="main">
            <div className="header">
              <div className="title">
                <h1>Panel Page</h1>
              </div>
            </div>
            <hr />
            <div className="content">

            </div>
            <Form />
          </div>
        </>
      )}
    </Container>
  )
}

export default ControlPanel;