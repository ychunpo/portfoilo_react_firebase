import React from 'react';
import styled from 'styled-components';
import SkillsItem from './SkillsItem';

const ItemList = styled.div`
background-color: orange;
height: 100vh;

h1 {
  margin: 30px;
  font-size: 2.5rem;
}

div {  
  display: flex;
  justify-content: center;
}

div .main {
  margin: 10px;
  padding: 0 20%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: flex-start;
  
  span {
    margin: 2px;

  }
  
}

`

const Skills = () => {
  return (
    <ItemList>
      <div>
        <h1>Skills</h1>
      </div>
      <div>
        <div className="main">
          <span>
            <SkillsItem />
          </span>
          <span>
            <SkillsItem />
          </span>
          <span>
            <SkillsItem />
          </span>
          <span>
            <SkillsItem />
          </span>
          <span>
            <SkillsItem />
          </span>


        </div>
      </div>

    </ItemList>


  )
}
export default Skills;
