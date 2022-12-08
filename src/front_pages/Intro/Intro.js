import React from 'react';
import styled from 'styled-components';
//import { FIEllipseBox } from './components/EllipseBox/FIEllipseBox';
import { FIEllipseBox } from './components/EllipseBox/FIEllipseBox';
import IntroContent from './components/IntroContent';

const FIContainer = styled.div`  
  height: 90vh;
  weight: 100%;
    
  .FI-area {
    height: 100%;
    weight: 100%;
    background:  
      linear-gradient(190deg, #323e3f,  11.98%, transparent 12%),  
      linear-gradient(15deg,   #C4F4F9 11.9%, transparent 12%),
      linear-gradient(-35deg,   #C4F4F9 46.9%, transparent 47%),  
      linear-gradient(145deg, #323e3f 46.9%, transparent 47%),  
      linear-gradient(90deg, #323e3f 49.9%,  #C4F4F9 49.9%);  
  }
  
  .FI-grid {
    height: 90vh;
    display: grid;
    grid-template-columns: 1fr 1fr; 
    place-items: center;
  }

  @media (max-width: 800px) {

    .left-side {   
      position: absolute;
      z-index: 5;
    }

    .right-side {
      position: absolute;
      z-index: 3;
    }
  }    
`

const Intro = () => {
  return (
    <FIContainer id="introduction-id">
      <div className="FI-area">
        <div className="FI-grid">
          <div className="left-side">
            <IntroContent />
          </div>
          <div className="right-side">
            <FIEllipseBox
              width='340px'
              height='340px'
              opacity='0.8'
              angle="10deg"
            >
            </FIEllipseBox>
          </div>
        </div>
      </div>
    </FIContainer>
  )
}

export default Intro;