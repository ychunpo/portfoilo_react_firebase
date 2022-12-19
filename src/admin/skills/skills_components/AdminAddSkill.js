import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const AASContainer = styled.div`
  margin: 0 20px;
  padding: 2px 15px;  

  .ASS-input-group{
    border: 2px solid #FF69B4;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px
  }

  .AAS-title {
    margin: 0 3px;
    padding: 0 6px;
    color: blue;    
    font-size: 1.2rem;
    font-weight: bold;    
  }

  .ASS-content {
    margin: 5px;
    padding: 5px;    
    display: flex;    
    gap: 15px;
  }

  .ASS-label {
    margin: 0 10px;
    color: blue; 
    font-size: 1.2rem;
    
  }

  .ASS-inputBox {
    padding: 0 10px;
    width: 200px;77
    font-size: 1.1rem;
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
  
  .ASS-btn-group{
    margin-right: 20px;
  }

  .AAS-btn-style {
    width: 70px;
    margin: 5px;
    
    padding: 1px 10px;
    font-size: 1.1rem;
    font-weight: bold;   
    color: blue;
    border: 1px solid blue;
    border-radius: 5px;    
    cursor: pointer;
    &:hover{
      border: 0;
      color: #FF69B4;
      transform: scale(1.1);
    }
  }  
`
const AddSkill = (props) => {
  const usesRef = useRef();
  const [singleSkill, setSingleSkill] = useState({
    name: "", level: "",
  });

  useEffect(() => {
    usesRef.current.focus();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setSingleSkill(prevSkill => ({
      ...prevSkill,
      [name]: value
    }));
  }

  const sendSubmit = (e, skill) => {
    e.preventDefault();
    props.addSubmit(skill);
  }

  return (
    <AASContainer>
      <div>
        <p className="AAS-title">Add Skill</p>
        <div className="ASS-input-group">
          <div className="ASS-content">
            <label className="ASS-label" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="ASS-inputBox"
              placeholder="Enter Name"
              value={singleSkill.name}
              onChange={(e) => handleChange(e)}
              ref={usesRef}
            />
          </div>
          <div className="ASS-content">
            <label className="ASS-label" htmlFor="level">
              Level:
            </label>
            <input
              type="number"
              name="level"
              className="ASS-inputBox"
              placeholder="Enter Number"
              value={singleSkill.level}
              min="1"
              max="100"
              maxLength="3"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="ASS-btn-group">
            <button className="AAS-btn-style" onClick={() => {
              setSingleSkill({
                name: "", level: "",
              })
            }}>
              Clear
            </button>
            <button className="AAS-btn-style" onClick={(e) => {
              sendSubmit(e, singleSkill);
              setSingleSkill({
                name: "", level: "",
              })
            }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </AASContainer >
  )
}

export default AddSkill;