import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import PanelNavbar from "../../components/admin/PanelNavbar";
import { auth, db } from "../../utils/firebase";
//import { useAuthState } from "react-firebase-hook/auth";
import DeleteSkill from "../../components/admin/DeleteSkill";
import AddSkill from "../../components/admin/AddSkill";


const Container = styled.div`

`

const SkillsList = () => {
  const [allSkills, setAllSkills] = useState([]);
  //const [user] = useAuthState(auth);

  useEffect(() => {
    const skillRef = collection(db, "Skills");
    //console.log(skillRef);
    const allData = query(skillRef, orderBy("name", "desc"));
    onSnapshot(allData, (snapshot) => {
      const skills = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllSkills(skills);
      //console.log(skills);
    });
  }, []);

  return (
    <Container>
      <PanelNavbar />

      {
        allSkills.length === 0 ? (
          <p>No Record found!</p>
        ) : (
          allSkills.map(({ id, name, level }) => (
            <div className="" key={id}>
              <div className="">
                <span>{name} : {level}</span>
              </div>
              <div>
                <DeleteSkill id={id} />
              </div>
            </div>
          ))
        )
      }
      <AddSkill />
    </Container>
  )
}

export default SkillsList;