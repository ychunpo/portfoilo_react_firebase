import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query, updateDoc, deleteDoc } from "firebase/firestore";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import PanelNavbar from "../../components/admin/PanelNavbar";
import HandleSkill from "../../components/admin/HandleSkill";
import AddSkill from "../../components/admin/AddSkill";
import "./index.css";


const Container = styled.div`
  margin: 0px;
  padding: 0px;
  text-align: center;
  font-family: "Poppins", sans-serif;
`

const SkillsList = () => {
  const [allSkills, setAllSkills] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const skillRef = collection(db, "Skills");
    const allData = query(skillRef, orderBy("name", "asc"));
    const unsub = onSnapshot(allData, (querySnapshot) => {
      const skills = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //console.log(skills)
      setAllSkills(skills);
    });
    return () => unsub();
  }, []);

  const EditSkill = async (singleSkill) => {
    await updateDoc(doc(db, "Skills", singleSkill.id));
    console.log(singleSkill);
  }

  const UpdateSkill = async (singleSkill) => {
    await updateDoc(doc(db, "Skills", singleSkill.id), { completed: !singleSkill.completed });
    console.log(singleSkill);
  }

  const DeleteSkill = async (id) => {
    await deleteDoc(doc(db, "Skills", id));
  }

  return (
    <Container>
      {!user ? (
        <>
          <h2>
            <Link to="/auth">Login to create data!</Link>
          </h2>
        </>
      ) : (
        <>
          <PanelNavbar />
          <AddSkill />
          <div>
            <h3>All Skills List</h3>
          </div>
          <div>
            {allSkills.length === 0 ? (
              <p>No Record found!</p>
            ) : (
              allSkills.map((allSkills) => (
                <HandleSkill
                  key={allSkills.id}
                  allSkills={allSkills}
                  updateSkill={UpdateSkill}
                  deleteSkill={DeleteSkill}
                  editSkill={EditSkill}
                />
              )))
            }
          </div>
        </>
      )}
    </Container>
  )
}

export default SkillsList;