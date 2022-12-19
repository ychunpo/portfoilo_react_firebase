import React from 'react';
import styled from 'styled-components';

const MainEllipse = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  opacity: ${props => props.opacity};  
  transform: rotate(${props => props.angleOne}); 
  background: #298dff;
  border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
  border: 1px solid #318cfe;
  box-shadow:  
    0px 10px 25px #a8ceff inset;
    0px 25px 32px #1a74e5 inset,
    0px 35px 35px rgba(255, 255, 255, 0.7) inset,    
    0px -23px 25px 0px rgba(0, 0, 0, 0.17) inset,    
    0px -36px 30px 0px rgba(0, 0, 0, 0.15) inset,
    0px -79px 40px 0px rgba(0, 0, 0, 0.1) inset,    
    0px 2px 1px #1b6cfb,
    0px 4px 2px rgba(0, 0, 0, 0.09),
    0px 8px 4px rgba(0, 0, 0, 0.1),
    0px 16px 8px rgba(0, 0, 0, 0.12),
    0px 32px 16px rgba(0, 0, 0, 0.15);  
    animation: BorderAnimation 6s linear infinite;

  &::before {      
        content: "";
        position: absolute;
        top: 3.7rem;
        left: 6rem;
        height: 4rem;
        width: 4rem;
        background-color: rgba(255,255, 255, 0.7);
        border: 1px solid #1b6cfb;
        z-index: 100;
        animation: BorderAnimation 5s linear infinite;
    }

    &::after {
      content: "";
      position: absolute;
      top: 4.2rem;
      left: 12rem;
      height: 2.5rem;
      width: 2.5rem;
      background-color: rgba(255,255, 255, 0.7);
      border: 1px solid #1b6cfb;
      z-index: 100;
      transform: rotate(${props => props.angleOne});
      animation: BorderAnimation 6s linear infinite;
    }  

  @keyframes BorderAnimation {
    0% {
      border-radius: 47% 53% 70% 30% / 30% 43% 57% 70%;
    }
    25% {
      border-radius: 51% 49% 48% 52% / 62% 44% 56% 38%;
      }
    50% {
      border-radius: 61% 39% 52% 48% / 44% 59% 41% 56%;
      }
    75% {
      border-radius: 40% 65% 31% 69% / 57% 59% 41% 43%;
      }
    100% {
      border-radius: 47% 53% 70% 30% / 30% 43% 57% 70%;
      }
  }
`

const EllipseBoxShadow = styled.div`
  display: relative;
  margin-Top: 450px;
  margin-left: 135px;
  width: 180px;
  height: 100px;
  background-color: rgba(5, 12, 20, 0.1);
  transform: rotate(-7deg);
  border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
  animation: BorderAnimation 6s linear infinite;
`

const FIEllipseBoxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
`

export const FIEllipseBox = ({ width, height, color, angle, angleTwo, opacity }) => {
  return (
    <FIEllipseBoxContainer>
      <MainEllipse
        width={width}
        height={height}
        color={color}
        angleOne={angle}
        opacity={opacity}
      >
        <EllipseBoxShadow />
      </MainEllipse>
    </FIEllipseBoxContainer>
  )
}