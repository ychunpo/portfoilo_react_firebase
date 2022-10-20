import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const AddSkillContainer = styled.div`
  margin: 10px;
  padding: 5px;  
  display: flex;
  
  border: 2px solid red;
  background-color: white;

  .form {
    margin: 5px;
    padding: 5px;    
    font-size: 1.2rem;
    display: flex;
    
  }

  .title {
    margin: 3px;
    padding: 6px;
    color: blue;
    position: relation;
    font-size: 1.3rem;
    font-weight: bold;    
  }

  .content {
    margin: 5px;
    padding: 5px;
    width: 265px;
    display: flex;    
    gap: 1.2rem;
  }

  .label-style {
    margin: 0;
  }

  .inputBox-style {
    padding: 0 10px;
    width: 120px;
    font-size: 1rem;
    outline: none;
    border: 1.1px solid green;
    border-radius: 5px;
    transition: 1s;
  }

  .input-style:focus {
    padding: 1px 11px;
    font-size: 1.1rem;  
    color: blue;
    border: 2px solid pink;
  }

  .input-style::placeholder{
    font-size: 1rem;
    padding-left: 0.2rem;
    color: rgb(190, 190, 190);
  }
  
  .btn-style {
    margin: 5px 15px;
    padding: 5px 10px;
    font-size: 1.2rem;
    font-weight: bold;    
    color: blue;
    background-color: white;
    cursor: pointer;
  }  
`
const AddSkill = (props) => {
  const [singleSkill, setSingleSkill] = useState({
    name: "",
    level: "",
  });
  const usesRef = useRef();

  useEffect(() => {
    usesRef.current.focus();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setSingleSkill(skill => ({
      ...skill,
      [name]: value
    }));
  }

  const sendSubmit = (e, skill) => {
    e.preventDefault();
    props.addSubmit(skill);
  }

  return (
    <AddSkillContainer>
      <div>
        <p className="title">Add Skill: </p>
        <div className="content">
          <label className="label-style" htmlFor="name">
            Name:&nbsp;
            <input
              type="text"
              name="name"
              className="inputBox-style"
              placeholder="Enter Name"
              value={singleSkill.name}
              onChange={(e) => handleChange(e)}
              ref={usesRef}
            />
          </label>
        </div>
        <div className="content">
          <label className="label-style" htmlFor="level">
            Level:&nbsp;
            <input
              type="number"
              name="level"
              className="inputBox-style"
              placeholder="Enter Number"
              value={singleSkill.level}
              min="1"
              max="100"
              maxLength="3"
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>
        <button className="btn-style" onClick={(e) => {
          sendSubmit(e, singleSkill);
          setSingleSkill({
            name: "",
            level: "",
          });
        }}>
          Save
        </button>
      </div>
    </AddSkillContainer>
  )
}

export default AddSkill;