import styled from 'styled-components';

export const SkillContainer = styled.div`
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