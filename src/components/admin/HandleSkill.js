import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

  .form {
    display: flex;
  }
`

const HandleSkill = (allData, editSkill, updateSkill, deleteSkill) => {
  const [changeData, setChangeData] = useState({
    name: allData.allSkills.name,
    level: allData.allSkills.level,
  })

  const handleChange = (e) => {
    e.preventDefault();
    // if (allData.allSkills.complete === true) {
    //   setChangeData({ ...changeData, [e.target.name]: e.target.value });
    // } else {
    //   allData.allSkills.name = "";
    //   allData.allSkills.level = "";
    //   setChangeData(e.target.value);
    // }
    setChangeData({ ...changeData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            className="input-style"
            value={allData.allSkills.name === "" ? changeData.name : allData.allSkills.name}
            onChange={handleChange}
          />
          <span> : </span>
          <input
            type="text"
            name="level"
            className="input-style"
            value={allData.allSkills.level === "" ? changeData.level : allData.allSkills.level}
            onChange={handleChange}
          />
        </div>
        <div className="btn-Group">
          <button
            className="btn-style"
            onClick={() => allData.updateSkill(allData.allSkills)}>
            Update
          </button>
          <button
            className="btn-style"
            onClick={() => allData.editSkill(allData.allSkills, changeData)}>
            Edit
          </button>
          <button
            className="btn-style"
            onClick={() => allData.deleteSkill(allData.allSkills.id)}>
            Delete
          </button>
        </div>
      </div>
    </Container>
  )
}

export default HandleSkill;