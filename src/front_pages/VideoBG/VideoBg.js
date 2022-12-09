import React from 'react';
import styled from "styled-components";

const FVBGContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;  
  background-color: #1e2b37;
  z-index: -1;
  

  .video-container {  
    margin: 0 auto;   
    width: 100%;
    hight:100%;    
    object-fit: fill;
  }
`

const VideoBg = () => {
  return (
    <FVBGContainer>
      <div className="FVBG-main">
        <video className="video-container" muted autoPlay="autoplay" controls>
          <source src={process.env.REACT_APP_VIDEO_LINK} type="video/mp4" />
          Your browser does not support video!
        </video>
      </div>
    </FVBGContainer>
  )
}

export default VideoBg;