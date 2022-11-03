import React from "react";
//import { motion } from 'framer-motion';
import styled from "styled-components";
import { IconButton } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';


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
    font-size: 1.4rem;
    border-radius: 5px;
    background-color: #aaa;
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
      color: #66FF00;
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
                    autoFocus
                  />
                ) : (
                  <span>{name}</span>
                )}

                <label className="text-style" htmlFor="level">Level:&nbsp;</label>
                {isEditing === id ? (
                  <input
                    type="number"
                    placeholder={level}
                    name="level"
                    value={singleSkill.level}
                    min="1"
                    max="100"
                    maxLength="3"
                    onChange={(e) => handleChange(id, e)}
                  />
                ) : (
                  <span>{level}</span>
                )}

              </div>
              <div className="icon-btn-group">

                {isEditing !== id ? (
                  <IconButton
                    className="icon-btn-style"
                    aria-label='edit skill'
                    icon={<EditIcon className="editSkill" />}
                    onClick={() => setIsEditing(id)}
                  />
                ) : (
                  <IconButton
                    className="icon-btn-style"
                    aria-label='confirm skill'
                    icon={<CheckIcon className="updateSkill" />}
                    onClick={() => {
                      updateSkill(singleSkill);
                      setIsEditing(null);
                    }}
                  />
                )}

                <IconButton
                  className="icon-btn-style"
                  aria-label='delete skill'
                  icon={<DeleteIcon className="deleteSkill" />}
                  onClick={() => deleteSkill(id)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </SkillsListContainer>
  )
}

export default SkillsList;