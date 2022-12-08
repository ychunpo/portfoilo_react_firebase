import React from 'react';
import styled from 'styled-components';
import AboutContent from './components/AboutContent';
import EnergyBall from './components/EnergyBall';

const FAContainer = styled.div`
  background-image: linear-gradient(#C4F4F9 1%, rgb(29,32,49) 50%,rgba(200,200,200,0.12),rgba(255,255,255,0.1));  
  display: flex;
  height: 95vh;
  align-items: center;

  @media (max-width: 1948px) {
    .FA-left-side {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr; 
      place-items: center;  
    }

    .FA-right-side {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr; 
      place-items: center;      
    }
  }

  @media (max-width: 848px) {}  

  @media (max-width: 620px) {
    .FA-left-side {
      position: absolute;
      width: 100%;
      z-index: 3;   
    }

    .FA-right-side {      
      padding: 0 5%;
      height: 100%;      
      z-index: 5;
      background-color: rgba(29,32,49,0.75);
    }
  }
`

const About = () => {
  return (
    <FAContainer id="about-id">
      <div className="FA-left-side">
        <EnergyBall />
      </div>
      <div className="FA-right-side">
        <AboutContent />
      </div>
    </FAContainer>
  )
}

export default About;