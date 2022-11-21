import React from 'react';
import styled from 'styled-components';
import { Box, Heading } from '@chakra-ui/react';
import { myInterestList } from '../../../data/myInterestList';

const AboutContentContainer = styled.div`
  width: 70%;
  font-family: 'Poppins', sans-serif;

  .AC-wrapper {
    display: flex;    
    margin: 0 auto;    
  }

  .AC-static-text {    
    padding: 1px 0;
    font-size: 1.3rem;
    color: white;
    white-space: nowrap;
    
  }

  .AC-dynamic-text {    
    margin-left: 10px;
    padding: 1px 0;
    height: 30px;
    line-height: 30px;   
    
  }

  .AC-dynamic-text li {
    list-style: none;
    color: orange;
    font-size: 1.3rem;
    font-weight: bold;
    position: relative;
    top: 0;
    animation: slide 16s steps(4) infinite;
    }

  @keyframes slide {
    100%{
      top: -360px;
    }
  }

  .AC-dynamic-text li span {
    position: relative;    
    line-height: 30px;
  }

  .AC-dynamic-text li span::after{
    content: "";
    position: absolute;
    left: 0; 
    height: 100%;   
    width: 100%;
    background: #1e2b37;
    border-left: 2px solid white;
    animation: typing 8s steps(4) infinite;
  }
  @keyframes typing {
    40%, 60%{
      left: 100%;
    }
    100%{
      left: 0;
    }
  }
`

const AboutContent = () => {




  return (
    <AboutContentContainer>
      <Heading as='h4' size='xl' color="white" m="10px 0">About Me</Heading>
      <Box>
        <span className="AC-static-text">
          I like to learn knowledge of design and computer.
        </span>
        <div className='AC-wrapper'>
          <span className="AC-static-text">Self-study have </span>
          <ul className='AC-dynamic-text'>
            {
              myInterestList.map(item => {
                return (
                  <li key={item}><span>{item}</span></li>
                )
              })
            }
          </ul>
        </div>
        <p className="AC-static-text">I have a strong interest in all.</p>
      </Box>
    </AboutContentContainer>

  )
}

export default AboutContent;