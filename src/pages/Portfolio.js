import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const ProjectList = styled.div`
margin: 0;
padding: 10px;
background-color: pink;

.container { 
  display: flex;  
  justify-content: center;
}

.card-list {
  padding: 20px;  
  display: flex;
  flex-wrap: wrap;
  justify-content: start;  
}
`

const Portfolio = () => {
  return (
    <ProjectList>
      <div>
        <h1>Projects</h1>
      </div>
      <div className="container">
        <div className="card-list">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </ProjectList>
  )
}

export default Portfolio;