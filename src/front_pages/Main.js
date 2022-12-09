import React, { lazy, Suspense } from 'react';
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
import VideoBg from './VideoBG/VideoBg';

const FrontLoading = lazy(() => import('./front_components/loading/FrontLoading'));

const FMContainer = styled.div`
    @media (max-width: 950px) { 
    .FMC-video {
      display: none;
    }
  }
`
const Main = () => {

  return (
    <FMContainer>
      <Navbar />
      <div className='FMC-video'>
        {
          <Suspense
            fallback={
              <div className='className="FS-lazy-loading"'>
                <FrontLoading height={40} radius={10} margin={20} color='black' />
              </div>
            }>
            <VideoBg />
          </Suspense>
        }
      </div>

      <Intro />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
      <BGParticles />
      <GoToTop />

    </FMContainer>
  )
}

export default Main;