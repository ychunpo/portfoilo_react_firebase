import React from 'react';
import styled from 'styled-components';

const EBContainer = styled.div`


  .EB-main {    
    position: relation;
    width: 300px;
    height: 300px;
  }

  .EB-main span {
    position: absolute;
    width: calc(350px + var(--i));
    height: calc(350px + var(--i));
    background: var(--color);
    border-radius: 50%;       
    animation: animate 5s linear infinite;
    animation-duration: calc(var(--d));
    mix-blend-mode: lighten;
    filter: blur(30px);
    transform-origin: calc(100px + var(--i)); 
  }

  .EB-main span:nth-child(even) {
    animation-direction: reverse;
  }

  @keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`

const EnergyBall = () => {
  const ballList = [
    { '--color': '#fbad04', '--i': '18px', '--d': '2.5s' },
    { '--color': '#03a1d9', '--i': '13px', '--d': '5s' },
    { '--color': '#f7036d', '--i': '15px', '--d': '7.5s' },
    { '--color': '#93ff16', '--i': '20px', '--d': '10s' },
  ]
  return (
    <EBContainer>
      <div className="EB-main">
        {ballList.map((item, i) => {
          console.log(item)
          return <span key={i} style={item}> </span>
        })}

      </div>
    </EBContainer >
  )
}

export default EnergyBall;
