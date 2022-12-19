import React, { useEffect, useState } from "react";
import {
  addDoc, deleteDoc, doc, collection,
  orderBy, onSnapshot, query, updateDoc,
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Heading } from '@chakra-ui/react';
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../utils/firebase";
import AdminSkillsList from "./skills_components/AdminSkillsList";
import AdminAddSkill from "./skills_components/AdminAddSkill";
import { toastOrder } from "../../data/verifyData";
import Loading from "../admin_components/Loading";
import Fail from "../admin_components/Loading/Fail";
//import AnimatedLoading from "../admin_components/Loading/AnimatedLoading";

const ASVContainer = styled.div`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  margin: 0 15px;
  padding: 5px;           
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;

  .ASV-heading {    
    text-align: center;
  }
`

const AdminSkillsView = () => {
  const [user] = useAuthState(auth);
  const navigation = useNavigate();
  const [allSkillsData, setAllSkillsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadFail, setLoadFail] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [singleSkill, setSingleSkill] = useState({
    name: "", level: "",
  });

  const resetSingleSkill = () => {
    setSingleSkill({ name: "", level: "" });
  }

  useEffect(() => {
    setLoading(true);
    const skillsRef = collection(db, "Skills");
    const allData = query(skillsRef, orderBy("name", "asc"));
    const unsubscribe = onSnapshot(allData,
      async (snapshot) => {
        if (snapshot.docs.length !== 0) {
          const skills = await snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllSkillsData(skills);
          setLoading(false);
        } else {
          setLoading(false);
          setLoadFail(true);
          console.log("Nothing in database")
        }
      },
      (error) => {
        console.log('Error message', error);
      }
    );
    return () => unsubscribe();
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

  return (
    <ASVContainer>
      <>
        <div className="ASV-main">
          <div className="ASV-heading">
            <Heading as='h4' size='lg' color='#FF69B4'>Skills List</Heading>
          </div>
          <div>
            <AdminAddSkill
              addSubmit={handleAddSkill}
            />
          </div>
          <div>
            {loading ? (<Loading />) : loadFail ? (<Fail />) : (
              <div>
                <AdminSkillsList
                  allSkillsData={allSkillsData}
                  singleSkill={singleSkill}
                  setSingleSkill={setSingleSkill}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  updateSkill={handleUpdateSkill}
                  deleteSkill={handleDeleteSkill}
                />
              </div>
            )}
          </div>
        </div>
      </>
    </ASVContainer>
  )
}

export default AdminSkillsView;