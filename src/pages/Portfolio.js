import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
margin: 0;
padding: 10px;
background-color: pink;

.card-container { 
  
}

.card-group {
  
  margin: auto;
  padding: 20px;  
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;  
}
`

const Portfolio = () => {
  return (
    <Container>
      <div>
        <h1>Projects</h1>
      </div>
      <div className="card-container">
        <div className="card-group">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </Container>
  )
}

export default Portfolio;