import React, { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { SkillContainer } from './styled/SkillContainer';

const Skills = () => {
  const [allSkillsData, setAllSkillsData] = useState([]);

  //firebase
  useEffect(() => {
    const skillsRef = collection(db, "Skills");
    const allData = query(skillsRef, orderBy("name", "asc"));
    const unsub = onSnapshot(allData, (querySnapshot) => {
      const skills = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllSkillsData(skills);
    });
    return () => unsub();
  }, []);

  return (
    <SkillContainer>
      <div>
        <h1>Skills</h1>
      </div>
      <div>
        <h4>(List include software)</h4>
        <div className="main">
          {allSkillsData.map((item, index) => {
            const { id, name, level } = item;
            return (
              <div key={id}>
                <span>{name} :</span>
                <span>{level}</span>
              </div>

            )
          })}

        </div>
      </div>

    </SkillContainer>


  )
}
export default Skills;
