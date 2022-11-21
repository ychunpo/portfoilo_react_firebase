import React from 'react';
import styled from 'styled-components';
import AboutContent from './pages_components/About/AboutContent';
import EnergyBall from './pages_components/EnergyBallAnimation/EnergyBall';

const FAContainer = styled.div`
  background-color: #1e2b37;
  display: flex;
  height: 100vh;
  align-items: center;

  .FA-left-side {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .FA-right-side {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .FA-about-me {
    
  }
`

const About = () => {
  return (
    <FAContainer id="FA-aboutId">
      <div className="FA-left-side">
        <EnergyBall />
      </div>
      <div className="FA-right-side">
        <div className="FA-about-me">
          <AboutContent />
        </div>
      </div>
    </FAContainer>
  )
}

export default About;