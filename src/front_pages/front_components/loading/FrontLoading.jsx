import React, { CSSProperties } from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import styled from 'styled-components';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: 'red',
}

const FrontLoadContainer = styled.div`
  width: 100%;
  height: 100%;  

  .front-loading-main{
    height: 200px;    
  }
`

const FrontLoading = ({ height, radius, margin, color }) => {
  return (
    <FrontLoadContainer>
      <div className="front-loading-main">
        <FadeLoader
          height={height}
          width={5}
          radius={radius}
          margin={margin}
          color={color}
          loading={true}
          cssOverride={{ override }}
          speedMultiplier={1}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </FrontLoadContainer>
  )
}

export default FrontLoading;