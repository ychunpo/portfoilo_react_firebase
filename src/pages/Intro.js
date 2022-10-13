import React from 'react';
import styled from 'styled-components';
import IntroContent from './components/IntroContent';

const HomeBox = styled.div`
display: flex;
height: 90vh;
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
    <HomeBox>
      <div className="left-side">
        <IntroContent />
      </div>
      <div className="right-side">
        May Be 3D Sline
      </div>
    </HomeBox>
  )
}

export default Intro;