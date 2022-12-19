import React from 'react';
import BackTop from '@uiw/react-back-top';
import styled from 'styled-components';
import { ImArrowUp } from "react-icons/im";

const GTTContainer = styled.div`

  .GTT-back-top { }
  
  .GTT-content {
    font-size: 2rem;
    color: rgba(255,255,255, 0.9);
    }
`

const GoToTop = () => {
  return (
    <GTTContainer>
      <BackTop
        style={{
          padding: '5px',
          borderRadius: "50%",
          border: "1px solid white"
        }}
        step={500}
        speed={80}
        content={<div className='GTT-content'><ImArrowUp /></div>}
        className='GTT-back-top'
      />
    </GTTContainer>
  )
}

export default GoToTop;