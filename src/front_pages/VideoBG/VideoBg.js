import React from 'react';
import styled from "styled-components";

const FVBGContainer = styled.div`
  width: 100%;
  height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e2b37;
  z-index: -1;

  .video-container {    
    width: 98vw;
    height: 90vh;
    object-fit: cover;
  }
`

const VideoBg = () => {
  return (
    <FVBGContainer>
      <div className="FVBG-main">
        <video className="video-container" muted autoPlay="autoplay" loop="loop">
          <source src={process.env.REACT_APP_VIDEO_LINK} type="video/mp4" />
          Your browser does not support video!
        </video>
      </div>
    </FVBGContainer>
  )
}

export default VideoBg;