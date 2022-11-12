import React from "react";
import { Link as ReachLink } from 'react-router-dom';
import styled from "styled-components";
import { Container, Flex, Link } from "@chakra-ui/react";
import Logo from "../Icon_components/Logo";
import Footer from "./pages_components/Footer";


const NFContainer = styled.div`
  font-family: 'Secular One', sans-serif;  
  margin: 0;
  height: 100vh;
  display: flex;
  flex-direction: column; 

  .NF-logo {
    margin: 10px;

  }

  .NF-main {
    margin-top: 90px;
    flex-grow: 1;
    
  }

  .NF-first {
    color: white;
    font-size: 150px;
    -webkit-text-stroke: 3px red;
    margin: 0;
    text-shadow: 15px 7px 5px gray;
    transform: skewY(-7deg);
    
  }

  .NF-second {
    font-size: 50px;
  }

  .NF-third {
    font-size: 30px;
    color: green;
  }

  .NF-footer {
    color: purple;
  }

`

const NotFound = () => {
  return (
    <NFContainer>
      <div className="NF-logo">
        <Logo />
      </div>
      <div className="NF-main">
        <Container centerContent>
          <p className="NF-first">404</p>
          <p className="NF-second">Opps! nothing here...</p>
          <br />
          <p className="NF-third">The page does not exist!</p>
          <Flex minWidth='max-content' gap="2">
            <p className="NF-third">Return to Home?</p>
            <Link as={ReachLink} to='/' color="blue" fontSize="30px">
              Click here
            </Link>
          </Flex>
        </Container>
      </div>

      <div className="NF-footer">
        <Footer />
      </div>
    </NFContainer>
  );
};

export default NotFound;
