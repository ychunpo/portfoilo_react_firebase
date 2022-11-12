import React from 'react';
import styled from 'styled-components';
import IntroContent from './pages_components/IntroContent';

const FIContainer = styled.div`
display: flex;
height: 95vh;
background-color: grey;

.left-side {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
`

const Intro = () => {
  return (
    <FIContainer>
      <div className="left-side">
        <IntroContent />
      </div>
      <div className="right-side">
        May Be 3D Sline
      </div>
    </FIContainer>
  )
}

export default Intro;