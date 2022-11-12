import React, { useState, useEffect } from 'react';
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import { Grid, GridItem, Text } from '@chakra-ui/react'
import ProgressBar from "@ramonak/react-progress-bar";
import { auth, db } from "../utils/firebase";
import { FSContainer } from './styled/FSContainer';

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
    <FSContainer>
      <div>
        <p className='FS-title'>Skills</p>
      </div>
      <div className="FS-main">
        <p className="FS-include">(This list included software)</p>
        <ul className="FS-list">

          {allSkillsData.map((item, index) => {
            const { id, name, level } = item;
            return (
              <li key={id} className="FS-skill-box">
                <Text className="FS-skill-name">{name}</Text>
                <div className='FS-skill-level'>
                  <ProgressBar completed={level} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </FSContainer>
  )
}
export default Skills;
