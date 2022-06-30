import React, { useState } from "react";
import styled from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "../../utils/firebase";
import { Link } from "react-router-dom";

const Container = styled.div`

`

const AddSkill = () => {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    name: "",
    level: 0,
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.level) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(storage);
    const uploadData = uploadBytesResumable(storageRef);

    const skillRef = collection(db, "Skills");
    addDoc(skillRef, {
      title: formData.name,
      skills: formData.level,
    }).then(() => {
      toast("Skills added successfully", { type: "success" });
      setProgress(0);
    }).catch((error) => {
      toast("Error adding skill", { type: "error" });
    });
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
          <h2>Create Skill</h2>
          <div className="form-style">
            <label htmlFor="name">Skill Name</label>
            <input
              type="text"
              name="name"
              className=""
              value={formData.name}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="level">Skill Level</label>
            <input
              type="text"
              name="level"
              className=""
              value={formData.level}
              onChange={(e) => handleChange(e)}
            />
            <button
              className=""
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </>
      )}
    </Container>
  )
}

export default AddSkill;