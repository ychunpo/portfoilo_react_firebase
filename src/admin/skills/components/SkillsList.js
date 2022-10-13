import React, { useState } from "react";
//import { motion } from 'framer-motion';
import styled from "styled-components";
import { MdDelete, MdEdit, MdOutlineSave } from 'react-icons/md';

const SkillsListContainer = styled.div`
  margin: 5px;
  padding: 5px;
  background-color: white;
  border: 0;
  border-radius: 15px;

  .skills-list {
    display: flex;
    justify-content: space-between; 
    align-items: center;
  }

  .skillData-group {
    
  }

  .text-style {
    margin: 5px;
    padding: 5px;
    font-size: 1.1rem;

    span {
      margin: 0 5px;
    }
  }

  .icon-btn-group {
    display: flex;
  }

  .icon-btn-style {
    margin: 5px;
    padding: 2px;
    font-size: 1.8rem;
    border-radius: 5px;
    background-color: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s ease background-color;
    &:hover {
      background-color: #ccc;
  }

  .updateSkill,
  .editSkill {
    color: white;
    &:hover {
      color: green;
    }
  }

  .deleteSkill {
    color: black;
    &:hover {
      color: red;
    }
  }
`

const SkillsList = ({
  allSkillsData,
  singleSkill,
  setSingleSkill,
  setIsEditing,
  isEditing,
  updateSkill,
  deleteSkill,
}) => {

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setSingleSkill(skill => ({
      ...skill,
      id: id,
      [name]: value,
    }));
  }

  return (
    <SkillsListContainer>
      <div className="skills-list">
        {allSkillsData.map((item) => {
          const { id, name, level } = item;
          return (
            <div key={id}>
              <div className="skillData-group">
                <label className="text-style" htmlFor="name">Name:&nbsp;</label>
                {isEditing === id ? (
                  <input
                    type="text"
                    placeholder={name}
                    name="name"
                    value={singleSkill.name}
                    onChange={(e) => handleChange(id, e)}
                  />
                ) : (
                  <span>{name}</span>
                )}

                <label className="text-style" htmlFor="level">Level:&nbsp;</label>
                {isEditing === id ? (
                  <input
                    type="text"
                    placeholder={level}
                    name="level"
                    value={singleSkill.level}
                    onChange={(e) => handleChange(id, e)}
                  />
                ) : (
                  <span>{level}</span>
                )}

              </div>
              <div className="icon-btn-group">
                {isEditing !== id ? (
                  <button
                    className="icon-btn-style"
                    onClick={() => setIsEditing(id)}>
                    <MdEdit className="editSkill" />
                  </button>
                ) : (
                  <button
                    className="icon-btn-style"
                    onClick={() => {
                      updateSkill(singleSkill);
                      setIsEditing(null);
                    }}>
                    <MdOutlineSave className="updateSkill" />
                  </button>
                )}

                <button
                  className="icon-btn-style"
                  onClick={() => deleteSkill(id)}>
                  <MdDelete className="deleteSkill" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </SkillsListContainer>
  )
}

export default SkillsList;