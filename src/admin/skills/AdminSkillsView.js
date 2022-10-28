import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../utils/firebase";
import AdminSkillsList from "./skills_components/AdminSkillsList";
import AdminAddSkill from "./skills_components/AdminAddSkill";
import JsonReport from "./skills_components/JsonReport";
import './AdminSkillsView.css';
import { toastOrder } from "../../data/verifyData";

const AdminSkillsContainer = styled.div`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  margin: 0;
  padding: 0;
  width: 100%;                                                                                                                                                                                                                                                                                                            
  display: flex;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;  
`

const AdminSkillsView = () => {
  const [user] = useAuthState(auth);
  const navigation = useNavigate();
  const [allSkillsData, setAllSkillsData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [singleSkill, setSingleSkill] = useState({
    name: "",
    level: "",
  });

  const resetSingleSkill = () => {
    setSingleSkill({
      name: "",
      level: "",
    });
  }

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

  const handleAddSkill = async (data) => {
    if (!user) {
      return navigation('/auth');
    }
    const { name, level } = data;
    const skillName = name.trim();
    const skillLevel = level.trim();

    let num = parseInt(skillLevel)
    if (!skillName || !skillLevel || typeof num !== "number" || isNaN(num)) {
      toastOrder();
      return;
    }

    await addDoc(collection(db, "Skills"), {
      name: skillName,
      level: skillLevel,
    }).then(() => {
      toast("Skill added successfully", { type: "success" });
    }).catch((error) => {
      toast("Error can't adding skill", { type: "error" });
    });
  }

  const handleUpdateSkill = async (data) => {
    if (!user) {
      return navigation('/auth');
    }
    const { id, name, level } = data;
    const skillName = name.trim();
    const skillLevel = level.trim();
    let num = parseInt(skillLevel);

    if (id && skillName && skillLevel && !isNaN(num)) {
      await updateDoc(doc(db, "Skills", id), { name: skillName, level: skillLevel })
        .then(() => {
          toast("Skill update successfully", { type: "success" });
        }).catch((error) => {
          toast("Error, can't update skill", { type: "error" });
        });
      resetSingleSkill();
    } else if (id && !skillName && skillLevel && !isNaN(num)) {
      await updateDoc(doc(db, "Skills", id), { level: skillLevel })
        .then(() => {
          toast("Skill update successfully", { type: "success" });
        }).catch((error) => {
          toast("Error, can't update skill", { type: "error" });
        });
      resetSingleSkill();
    } else if (id && skillName && !skillLevel) {
      await updateDoc(doc(db, "Skills", id), { name: skillName })
        .then(() => {
          toast("Skill update successfully", { type: "success" });
        }).catch((error) => {
          toast("Error, can't update skill", { type: "error" });
        });
      resetSingleSkill();
    } else {
      toast("Data no change", { type: "default" });
      return;
    }
  }

  const handleDeleteSkill = async (id) => {
    await deleteDoc(doc(db, "Skills", id))
      .then(() => {
        toast("Skill delete successfully", { type: "success" });
      }).catch((error) => {
        toast("Error, can't delete skill", { type: "error" });
      });
  }
  //firebase

  return (
    <AdminSkillsContainer>
      <>
        <div className="admin-skills-main">
          <div className="admin-skills-main-title">
            <h2>Skills List</h2>
          </div>
          <div className="admin-skills-main-add">
            <AdminAddSkill
              addSubmit={handleAddSkill}
            />
          </div>
          <div className="admin-skills-main-list">
            {allSkillsData.length === 0 ? (
              <p>No Record Found!</p>
            ) : (
              <AdminSkillsList
                allSkillsData={allSkillsData}
                singleSkill={singleSkill}
                setSingleSkill={setSingleSkill}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                updateSkill={handleUpdateSkill}
                deleteSkill={handleDeleteSkill}
              >
              </AdminSkillsList>
            )}
          </div>
          <div className="skills-json-report">
            <JsonReport Data={allSkillsData} />
          </div>
        </div>
      </>
    </AdminSkillsContainer>
  )
}

export default AdminSkillsView;