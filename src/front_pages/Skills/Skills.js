import React, { useState, useEffect, lazy, Suspense } from 'react';
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import styled from 'styled-components';
import { Heading, Box, Text } from '@chakra-ui/react';
import { db } from "../../utils/firebase";
import FrontLoading from "../front_components/loading/FrontLoading";
const SkillsList = lazy(() => import('./components/SkillsList'));

const FSContainer = styled.div`  
  margin: 0 auto;
  padding: 20px 3%;
  width: 100%;
  display: flex;
  flex-direction: column;  
  background-image: linear-gradient(rgba(255,255,255,0.1),rgba(29,32,49,0.9));

  .FS-main {
    margin: 0px auto;
    padding: 10px 0;   
    width: 100%;
    display: flex;
    justify-content: center; 
  }  

  .FS-lazy-loading{    
    margin: 0 auto;
  }
`

const Skills = () => {
  const [allSkillsData, setAllSkillsData] = useState([]);

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
    <FSContainer id="skills-id">
      <Box
        border='3px solid white'
        borderRadius='3xl'
        bgColor='rgba(29,32,49,0.8)'
        pb='30px'>
        <Heading
          pt="5px"
          as='h4'
          size='xl'
          align='center'
          color='#f5b8fc'
        >
          Skills
        </Heading>
        <Text
          p='2'
          textAlign='center'
          color='white'
        >
          (This list included software)
        </Text>
        <div className="FS-main">
          <Suspense
            fallback={
              <div className='className="FS-lazy-loading"'>
                <FrontLoading height={40} radius={10} margin={20} color='#f5b8fc' />
              </div>
            }>
            <SkillsList allSkillsData={allSkillsData} />
          </Suspense>
        </div>
      </Box>
    </FSContainer>
  )
}

export default Skills;