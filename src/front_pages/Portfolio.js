import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import styled from 'styled-components';
import {
  Box, Button,
  Container,
  Heading,
  Modal, ModalOverlay, ModalContent, ModalFooter,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-cube";
import { db } from "../utils/firebase";
import ProjectCard from "./pages_components/CardBox/ProjectCard";
import ProjectModel from "./pages_components/ModelBox/ProjectModel";
import Loading from "../admin/admin_components/Loading";
import Fail from "../admin/admin_components/Loading/Fail";

const FPContainer = styled.div`
  height: 95vh; 
  background-color: yellow;

  .swiper {
  width: 100%;
  height: 100%;  
  }

  .swiper-slide {
  /*background-position: center;*/
  /*background-size: cover;*/
  /*text-align: center;*/
  font-size: 18px;  

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;  
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    border: 1px solid white;
    object-fit: cover;
  }  

  .FP-title {
    margin: 0;
    padding-top: 30px;
    padding-bottom: 100px;
    text-align: center;
  }

  .FP-main {

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
      (error) => {
        console.log('Error message', error);
      }
    );
    return () => unsubscribe();
  }, []);



  return (
    <FPContainer>
      <div className="FP-title">
        <Heading>Projects</Heading>
      </div>
      <div className="FP-main">
        {loading ? (
          <Container>
            <Loading />
          </Container>
        ) : loadFail ? (
          <Container>
            <Fail />
          </Container>
        ) : (
          <Swiper
            style={{
              "--swiper-navigation-color": "blue",
              "--swiper-pagination-color": "purple",
            }}
            // install Swiper modules
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            loop={true}
            loopFillGroupWithBlank={false}
            centeredSlides={false}
            rewind={false}
            grabCursor={false}
            navigation={true}
            mousewheel={false}
            keyboard={false}
            pagination={{ clickable: true }}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 0,
              },
              0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 0,
              },
            }}
            className="mySwiper"
          >
            {allProjectsData.map((data, index) => (
              <SwiperSlide key={data.id} virtualIndex={index}>
                <Box
                  borderRadius="20px"
                  borderWidth="2px"
                  w='350px'
                  bg="pink"
                >
                  <ProjectCard data={data} />
                  <VStack pb="30px">
                    <Button
                      zIndex={2}
                      colorScheme='blackAlpha'
                      onClick={() => {
                        onOpen();
                        setSingleData(data);
                      }}>
                      View
                    </Button>
                  </VStack>
                </Box>
                <Modal
                  size="xl"
                  isOpen={isOpen}
                  onClose={onClose}
                  scrollBehavior={"inside"}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ProjectModel
                      singleData={singleData}
                    />
                    <ModalFooter>
                      <Button
                        onClick={() => {
                          onClose();
                          setSingleData({});
                        }}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </FPContainer >
  )
}

export default Portfolio;