import React, { useState, useEffect } from 'react';
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import styled from 'styled-components';
import { Heading, Box, Text } from '@chakra-ui/react';
import ProgressBar from "@ramonak/react-progress-bar";
import { db } from "../utils/firebase";

export const FSContainer = styled.div`
  background-color: #35d0a5;
  margin: 0 auto;
  padding: 20px 13%;
  width: 100%;
  display: flex;
  flex-direction: column;
  
  ul {
    list-style: none;
  }

  .FS-include {
    padding: 20px;
    text-align: center;
  }

  .FS-main {
    margin: 0px auto;
    padding: 10px 0;
    width: 100%;
  }

  .FS-list {
    margin: 0 10px;
    padding:5px;    
  }

  .FS-list li {    
    width: 31.3333%;
    margin: 0 1%;
    float: left;
  }

  .FS-skill-level {    
    display: grid;
    grid-template-columns: 9fr 1fr;
  }

  @media (max-width: 768px) {
  .FS-list li {
    width: 48%;
  }}

  @media (max-width: 569px) {
    .FS-list li {
      width: 98%;
    }
  }
`

const Skills = () => {
  const [allSkillsData, setAllSkillsData] = useState([]);

  //firebase
  useEffect(() => {
    const skillsRef = collection(db, "Skills");
    const allData = query(skillsRef, orderBy("name", "asc"));
    const unsubscribe = onSnapshot(allData,
      async (querySnapshot) => {
        const skills = await querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllSkillsData(skills);
      });
    return () => unsubscribe();
  }, []);

  return (
    <FSContainer id="skillsId">
      <Heading
        pt="5px"
        as='h4'
        size='xl'
        align='center'
        color='white'
      >
        Skills
      </Heading>
      <div className="FS-main">
        <div className="">
          <p className="FS-include">(This list included software)</p>
          <ul className="FS-list">
            {allSkillsData.map((item, index) => {
              const { id, name, level } = item;
              return (
                <li key={id} className="FS-skill-box">
                  <Text
                    m="5px"
                    fontSize='xl'
                  >
                    {name}
                  </Text>
                  <div className='FS-skill-level'>
                    <ProgressBar
                      completed={level}
                      height="20px"
                      labelAlignment="outside"
                      labelSize="15px"
                      baseBgColor="#f9f6fc"
                      bgColor="#9485ce"
                      labelColor="black"
                      animateOnRender
                    />
                    <Text color='black' fontSize="15px">%</Text>
                  </div>

                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </FSContainer>
  )
}
export default Skills;
