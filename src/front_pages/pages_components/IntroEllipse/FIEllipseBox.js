import React from 'react';
import styled from 'styled-components';

const AngleBox = styled.div`
  transform: rotate(${props => props.angleTwo}); 
`

const StyledEllipse = styled.div`

    width:350px;
    height:350px;  
    background-color: ${props => props.color};    
    border-radius: 80% 20% 54% 46% / 46% 20% 80% 54%;    
    display: grid;
    grid-template-columns: 1fr; 
    place-items: center;
    transform: rotate(${props => props.angleOne});
    animation: BorderAnimation 5s linear infinite;

    &::before {
      content: "";
      position: absolute;
      top: 3.5rem;
      left: 4.5rem;
      height: 4rem;
      width: 4rem;
      background-color: #ffffff;
      z-index: 1000;
      animation: BorderAnimation 5s linear infinite;
    }

    &::after {
      content: "";
      position: absolute;
      top: 5rem;
      left: 9rem;
      height: 2rem;
      width: 2rem;
      background-color: #ffffff;
      z-index: 1000;
      animation: BorderAnimation 5s linear infinite;
    }

    @keyframes BorderAnimation {
      0% {
      border-radius: 47% 53% 70% 30% / 30% 43% 57% 70%;
      }

      30% {
        border-radius: 61% 39% 52% 48% / 44% 59% 41% 56%;
      }

      70% {
        border-radius: 35% 65% 31% 69% / 57% 59% 41% 43%;
      }

      100% {
        border-radius: 47% 53% 70% 30% / 30% 43% 57% 70%;
      }
    }
`

const FIEllipseBoxContainer = styled.div`

`

export const FIEllipseBox = ({ children, color, angleOne, angleTwo }) => {
  return (
    <FIEllipseBoxContainer>
      <StyledEllipse
        color={color}
        angleOne={angleOne}
      >
        <AngleBox angleTwo={angleTwo}>
          {children}
        </AngleBox>
      </StyledEllipse>
    </FIEllipseBoxContainer>
  )
}
