import React from 'react';
import styled from 'styled-components';
import AboutText from '../components/AboutText';

const AboutBox = styled.div`
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
    <AboutBox>
      <div className="left-side">
        Left Side - CSS
      </div>
      <div className="right-side">
        <AboutText />
      </div>
    </AboutBox>
  )
}

export default About;