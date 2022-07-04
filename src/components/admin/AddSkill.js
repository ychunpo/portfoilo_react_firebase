import React, { useState } from "react";
import styled from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../utils/firebase";

const Container = styled.div`
  margin: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;  

  .form {
    margin: 5px;
    padding: 5px;
    display: flex;
    justify-content: center;
    
    font-size: 1.3rem;
    font-weight: bold;
    border: 3px solid red;
  }

  .content {
    margin: 5px 10px;
    padding: 0;    
  }

  .label-style {
    margin: 0 10px 0 0;
  }

  .input-style {
    font-size: 1.2rem;
    font-weight: bold;    
  }
  
  .btn-style {
    margin: 0 10px;
    padding: 0 5px;
    font-size: 1.3rem;
    font-weight: bold;
  }  
`

const AddSkill = () => {
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: "",
  });

  const handleChange = (e) => {
    setNewSkill({ ...newSkill, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.level) {
      alert("Please fill all the fields");
      return;
    }
    const skillRef = collection(db, "Skills");
    await addDoc(skillRef, {
      name: newSkill.name,
      level: newSkill.level,
    }).then(() => {
      toast("Skill added successfully", { type: "success" });
    }).catch((error) => {
      toast("Error adding skill", { type: "error" });
    });
  }

  return (
    <Container>
      <div className="form">
        <div className="content">
          <label className="label-style" htmlFor="name">Skill Name: </label>
          <input
            type="text"
            name="name"
            className="input-style"
            placeholder="Enter Name"
            value={newSkill.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="content">
          <label className="label-style" htmlFor="level">Skill Level: </label>
          <input
            type="text"
            name="level"
            className="input-style"
            placeholder="Enter Number"
            value={newSkill.level}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="btn-style" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </Container>
  )
}

export default AddSkill;