import React from 'react';
import styled from 'styled-components';
import name from '../assets/initialism_name_square.png'

const CardBox = styled.div`
border: 1px solid;

margin: 20px;
height: 70vh;
width: 400px;
display: flex;
justify-content: center;

.img-style {
  margin: 50px 0 0 0;
  width: 300px;
  height: 350px;
  border: 1px solid;
}

`

const Card = () => {
  return (
    <CardBox>
      <div>
        <img className="img-style" src={name} alt="Cover"></img>
        <h2>Title</h2>
        <p>Description</p>
        <button>Show</button>
      </div>
    </CardBox>
  )
}

export default Card;