import React from "react";
import styled from "styled-components";

const Item = styled.div`
margin: 5px;
padding: 5px;

span {
  padding: 5px;
  font-size: 1.5rem;
  font-width: bold;
}

`

const SkillItem = (prop) => {
  return (
    <Item>
      <span>Skill Name: </span>  <span> 80 </span>
    </Item>

  )
}

export default SkillItem;