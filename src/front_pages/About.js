import React from 'react';
import styled from 'styled-components';
import AboutText from './pages_components/AboutContent';

const FAContainer = styled.div`
background-color: green;
display: flex;
height: 100vh;
align-items: center;

.left-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

`

const About = () => {
  return (
    <FAContainer>
      <div className="left-side">
        Left Side - CSS
      </div>
      <div className="right-side">
        <AboutText />
      </div>
    </FAContainer>
  )
}

export default About;