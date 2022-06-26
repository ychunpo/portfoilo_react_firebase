import React from 'react';
import styled from 'styled-components';

const AboutContext = styled.div`
width: 60%;

h1, p {
  text-align: left;
}
`

const AboutText = () => {
  return (
    <AboutContext>
      <h1>About Me</h1>
      <p>I like to learn the knowledge of design and computer.</p>
      <p>
        Whether it is Graphics, 3D Modeling, Game, Video,
        Mobile App, Front-end, Back-end, Blockchain,
        AI learning or Business Intelligence
        is all of strong interesting.
      </p>
      <p>And I will try to practice at the same time.</p>
    </AboutContext>

  )
}

export default AboutText;