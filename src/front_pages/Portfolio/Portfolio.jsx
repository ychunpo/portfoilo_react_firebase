import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import styled from 'styled-components';
import { Box, Container, Heading, Modal, useDisclosure } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-cube";
import { db } from "../../utils/firebase";
import ProjectCard from "./components/ProjectCard";
import ProjectModel from "./components/ProjectModel";
import FrontLoading from "../front_components/loading/FrontLoading";
import Fail from "../../admin/admin_components/Loading/Fail";

const FPContainer = styled.div`   
  background-color:  rgba(255, 255, 255, 0.1);
  
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    /*background-position: center;*/
    /*background-size: cover;*/
    /*text-align: center;*/
    font-size: 18px;   
    display: flex; 
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;    
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;     

  .swiper-slide img {
    display: block;
    width: 100%;    
    object-fit: cover;
  }

  .swiper-container {
    overflow: visible;      
    }
  }

  .swiper-pagination {} 

  .FP-main {
    height: 85vh;
  }

  .FP-swiper-slide {
    &:hover {
      border: 3px solid #ED64A6;      
    }
  }

  .chakra-card__body{
    &:hover {        
      margin: auto;      
      height: 100.3%;
      width: 100.3%;
    }
  }
`

const Portfolio = () => {
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadFail, setLoadFail] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    const projectRef = collection(db, "Projects");
    const allData = query(projectRef, orderBy("rank", "asc"));
    const unsubscribe = onSnapshot(allData,
      async (snapshot) => {
        if (snapshot.docs.length !== 0) {
          const projects = await snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllProjectsData(projects);
          setLoading(false);
        } else {
          setLoading(false);
          setLoadFail(true);
          console.log("Nothing in database")
        }
      },
      (error) => { console.log('Error message', error) }
    );
    return () => unsubscribe();
  }, []);

  return (
    <FPContainer id="portfolio-id">
      <Heading as='h2' size='2xl' pt="10px" color="blue.300" align='center'>Projects</Heading>
      <div className="FP-main">
        {loading ? (
          <Container h='100%' align='center'>
            <Box h='100%' display='flex' alignItems='center'>
              <FrontLoading height={40} radius={10} margin={20} color='yellow' />
            </Box>
          </Container>
        ) : loadFail ? (
          <Container h='100%' align='center'><Fail /></Container>
        ) : (
          <Swiper
            style={{
              "--swiper-navigation-color": "white",
              "--swiper-pagination-color": "yellow",
              opacity: 0.9,
            }}
            // Swiper modules
            modules={[Navigation, Pagination]}
            loop={false}
            loopFillGroupWithBlank={false}
            centeredSlides={false}
            navigation={true}
            rewind={false}
            grabCursor={true}
            mousewheel={false}
            keyboard={false}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0, },
              599: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0, },
              1023: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 0, },
              1439: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 0, },
            }}
            className="mySwiper"
          >
            {allProjectsData.map((data, index) => (
              <SwiperSlide key={data.id} virtualIndex={index}>
                <Box
                  borderRadius="10px" borderWidth='4px' borderColor='white'
                  w={{ base: '280px', lg: '360px', md: '350px', sm: '340px', xs: '390px' }}
                  bg="white"
                  className="FP-swiper-slide"
                >
                  <ProjectCard data={data} onOpen={onOpen} setSingleData={setSingleData} />
                </Box>
                <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
                  <ProjectModel
                    singleData={singleData}
                    setSingleData={setSingleData}
                    isOpen={isOpen}
                    onClose={onClose}
                  />
                </Modal>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </FPContainer>
  )
}

export default Portfolio;