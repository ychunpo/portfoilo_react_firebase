import React from "react";
//import { motion } from 'framer-motion';
import styled from "styled-components";
import { IconButton } from '@chakra-ui/react'
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';


const ASLContainer = styled.div`
  margin: 5px;
  padding: 5px;
  background-color: #F0F0F0;
  border: 0;
  border-radius: 10px;
  
  .ASL-main {    
    margin: 15px;
    padding: 0;          
    border: 0;
    border-radius: 15px;
    background-color: white;    
  }

  .ASL-skill-group {   
      
  }

  .ASL-center {    
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid pink;
    border-radius: 15px;
  }

  .ASL-input-group {
    width: 350px;
    padding: 15px;
    
  }

  .ASL-label {    
    font-size: 1.1rem;
    margin-right: 10px;

    span {
      margin: 0 5px;
    }
  }

  .ASL-input{    
    padding: 0 10px;
    font-size: 1rem;
    border: 1.5px solid green;
    border-radius: 10px;
  }

  .ASL-icon-btn-group {
    margin-right: 5px;
    display: flex;    
  }

  .ASL-icon-btn {
    margin: 5px;
    padding: 2px;
    font-size: 1.3rem;
    border-radius: 10px;
    background-color: #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s ease background-color;
    &:hover {
      background-color: #ccc;
      opacity: 0.9;
  }

  .ASL-updateSkill-btn,
  .ASL-editSkill-btn {
    color: white;
    &:hover {
      color: #66FF00;
    }
  }

  .ASL-deleteSkill-btn {
    color: black;
    &:hover {      
      color: #ff4040;
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
    <ASLContainer>
      <div className="ASL-main">

        {allSkillsData.map((item) => {
          const { id, name, level } = item;
          return (
            <div key={id} className="ASL-skill-group">
              <div className="ASL-center">
                <div className="ASL-input-group">
                  <label className="ASL-label" htmlFor="name">
                    Name:
                  </label>
                  {isEditing === id ? (
                    <input
                      type="text"
                      placeholder={name}
                      name="name"
                      value={singleSkill.name}
                      className="ASL-input"
                      onChange={(e) => handleChange(id, e)}
                      autoFocus
                    />
                  ) : (<span>{name}</span>)}
                </div>
                <div className="ASL-input-group">
                  <label className="ASL-label" htmlFor="level">
                    Level:
                  </label>
                  {isEditing === id ? (
                    <input
                      type="number"
                      placeholder={level}
                      name="level"
                      value={singleSkill.level}
                      min="1"
                      max="100"
                      maxLength="3"
                      className="ASL-input"
                      onChange={(e) => handleChange(id, e)}
                    />
                  ) : (<span>{level}</span>)}
                </div>
                <div className="ASL-icon-btn-group">
                  {isEditing !== id ? (
                    <IconButton
                      className="ASL-icon-btn"
                      aria-label='edit skill'
                      icon={<EditIcon className="ASL-editSkill-btn" />}
                      onClick={() => setIsEditing(id)}
                    />
                  ) : (
                    <IconButton
                      className="ASL-icon-btn"
                      aria-label='confirm skill'
                      icon={<CheckIcon className="ASL-updateSkill-btn" />}
                      onClick={() => {
                        updateSkill(singleSkill);
                        setIsEditing(null);
                      }}
                    />
                  )}
                  <IconButton
                    className="ASL-icon-btn"
                    aria-label='delete skill'
                    icon={<DeleteIcon className="ASL-deleteSkill-btn" />}
                    onClick={() => deleteSkill(id)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </ASLContainer>
  )
}

export default SkillsList;