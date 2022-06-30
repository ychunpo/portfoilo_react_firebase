import React from 'react';
//import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Intro from './Intro';
import About from './About';
import Portfolio from './Portfolio';
import Skills from './Skills';
import Contact from './Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Intro />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}

export default Home;