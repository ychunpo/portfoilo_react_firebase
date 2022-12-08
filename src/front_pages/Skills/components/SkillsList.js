import React from 'react';
import styled from 'styled-components';
import { Text } from '@chakra-ui/react';
import ProgressBar from "@ramonak/react-progress-bar";

const FSListContainer = styled.div`

  .FS-list {
    margin: 0 10px 0 2%;
    padding:5px;
    list-style: none;

  }

  .FS-list li {    
    width: 31.3333%;
    margin: 0 1%;    
    float: left;    
  }

  .FS-skill-group{}

  .FS-skill-level {    
    display: grid;
    grid-template-columns: 9fr 1fr;    
  }

  @media (max-width: 768px) {
  .FS-list li {
    width: 48%;
  }}

  @media (max-width: 569px) {
    margin: 0 10px 0 7%;

    .FS-list li {
      width: 98%;
    }

    .FS-skill-level {}

    .FS-list li{
      text-align: center;
    }
  }
`

const SkillsList = ({ allSkillsData }) => {
  return (
    <FSListContainer>
      <ul className="FS-list">
        {allSkillsData.map((item, index) => {
          const { id, name, level } = item;
          return (
            <li key={id} className="FS-skill-box">
              <Text
                m="5px"
                fontSize='xl'
                color='white'
              >
                {name}
              </Text>
              <div className='FS-skill-group'>
                <div className='FS-skill-level'>
                  <ProgressBar
                    completed={level}
                    height="20px"
                    labelAlignment="outside"
                    labelSize="15px"
                    baseBgColor="#d391d8"
                    bgColor="white"
                    labelColor="#f9f6fc"
                    animateOnRender
                  />
                  <Text
                    w={4}
                    color='#f9f6fc'
                    fontSize="15px"
                  >%</Text>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </FSListContainer >
  )
}

export default SkillsList;