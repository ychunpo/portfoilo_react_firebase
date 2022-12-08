import React, { useCallback, lazy, Suspense } from 'react';
import styled from 'styled-components';
import BGParticles from './front_components/BackgroundParticles/BGParticles';
import Navbar from './front_components/Navbar';
import Intro from './Intro/Intro';
import About from './About/About';
import Portfolio from './Portfolio/Portfolio';
import Skills from './Skills/Skills';
import Contact from './Contact/Contact';
import Footer from './front_components/Footer';
import GoToTop from './front_components/BackToTop/GoToTop';
//import VideoBg from './VideoBG/VideoBg';
import FrontLoading from "./front_components/loading/FrontLoading";


const FMContainer = styled.div`
  
`


const Main = () => {


  return (
    <FMContainer>
      <Navbar />
      {
        /**
       <Suspense
        fallback={
          <div className='className="FS-lazy-loading"'>
            <FrontLoading height={40} radius={10} margin={20} color='black' />
          </div>
        }>
        <VideoBg />
      </Suspense>
       */
      }
      <Intro />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
      <BGParticles />
      <div style={{ width: '100%', }}>
        <div style={{ paddingLeft: '30px' }}>
          <GoToTop />
        </div>

      </div>





    </FMContainer>
  )
}

export default Main;