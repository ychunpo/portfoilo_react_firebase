import React from 'react';
import styled from 'styled-components';
import Navbar from './pages_components/Navbar';
import Intro from './Intro';
import About from './About';
import Portfolio from './Portfolio';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './pages_components/Footer';
import VideoBg from './VideoBg';

const FMContainer = styled.div`
  
`

const Main = () => {
  return (
    <FMContainer>
      <Navbar />

      <Intro />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
    </FMContainer>
  )
}

export default Main;