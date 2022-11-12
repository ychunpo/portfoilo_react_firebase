import React from 'react';
import styled from 'styled-components';


const AnimatedLoadingContainer = styled.div`

`

const AnimatedLoading = () => {
  return (
    <AnimatedLoadingContainer>
      <div className="spinner">
        Loading
      </div>
    </AnimatedLoadingContainer>
  )
}

export default AnimatedLoading
