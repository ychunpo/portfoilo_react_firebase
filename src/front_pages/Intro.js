import React from 'react';
import styled from 'styled-components';
import { FIEllipseBox } from './pages_components/IntroEllipse/FIEllipseBox';
import IntroContent from './pages_components/IntroContent';

const FIContainer = styled.div`  
  height: 90vh;
  weight: 100%;
    
  .FI-area {
    height: 100%;
    weight: 100%;
  background:  
    linear-gradient(190deg, #656565, #1e2b37 11.8%, transparent 12%),  
    linear-gradient(15deg,  white, #C4F4F9 11.8%,  transparent 12%),
    linear-gradient(-35deg,  white, #C4F4F9 46.8%, transparent 47%),  
    linear-gradient(145deg, #1e2b02, #1e2b37 46.8%, transparent 47%),  
    linear-gradient(90deg, #1e2b12, #1e2b37 49.8%, white, #C4F4F9 49.8%);  
  }
  
  .FI-grid {
    height: 90vh;
    display: grid;
    grid-template-columns: 1fr 1fr; 
    place-items: center;
  }

  .left-side {   
    
  }

  .right-side {

  }

`

const Intro = () => {
  return (
    <FIContainer id="introductionId">
      <div className="FI-area">
        <div className="FI-grid">
          <div className="left-side">
            <FIEllipseBox
              color="#03a1d9"
              angleOne="8deg"
              angleTwo="-8deg"
            >
              <IntroContent />
            </FIEllipseBox>
          </div>
          <div className="right-side">
            <FIEllipseBox
              color="#1e2b02"
              angleOne="-168deg"
              angleTwo="168deg"
            >
              <div className="">

              </div>
            </FIEllipseBox>
          </div>
        </div>
      </div>
    </FIContainer>
  )
}

export default Intro;