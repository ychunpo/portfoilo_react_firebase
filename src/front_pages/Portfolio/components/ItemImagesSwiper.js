import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper';
import styled from 'styled-components';
import { Box, Divider, Image, VStack, Text } from '@chakra-ui/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

const IISContainer = styled.div`
  padding-top: 10px;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

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
  }
`

const ItemImagesSwiper = ({ items }) => {
  const [showNavigation, setShowNavigation] = useState(true);

  const changeNavigationState = () => {
    let viewportWidth = document.documentElement.clientWidth;
    if (viewportWidth < 600) {
      setShowNavigation(false);
    } else {
      setShowNavigation(true);
    }
  }

  useEffect(() => {
    changeNavigationState();
    window.addEventListener('resize', changeNavigationState);
    return () => {
      window.removeEventListener('resize', changeNavigationState);
    }
  }, []);

  return (
    <IISContainer>
      {items.map((item, index) => {
        const { itemId, itemCaption, itemText, itemImages } = item;
        return (
          <Box key={itemId} p='10px 0'>
            <VStack width='70%' m='0 auto' pb='10px'>
              <Text fontSize='md' as='b' color='blue.600'>{itemCaption}</Text>
              <Text fontSize='xs' color='pink.500'>(Double-click the image to enlarge)</Text>
            </VStack>
            <Swiper
              style={{
                "--swiper-navigation-color": "#f4669a",
                "--swiper-pagination-color": "#000",
              }}
              slidesPerView={1}
              spaceBetween={40}
              zoom={{ clickable: true }}
              navigation={showNavigation}
              pagination={{
                clickable: true,
                //type: "fraction",
              }}
              passiveListeners={false}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                600: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
              }}
              modules={[Navigation, Pagination, Zoom]}
              className="mySwiper"
            >
              {
                itemImages.length !== 0 ? itemImages.map((imageItem, index) => {
                  return (
                    <SwiperSlide key={imageItem.itemImageId}>
                      <div className="swiper-zoom-container">
                        <Image
                          m="auto" boxSize='400px'
                          src={imageItem.itemImagePath}
                          alt={imageItem.itemImageFilename}
                          fallbackSrc='https://via.placeholder.com/380'
                        />
                      </div>
                    </SwiperSlide>
                  )
                }) : (<Divider />)
              }
            </Swiper>
            {itemText && (
              <Box
                m='0 auto'
                p='0 20%'
                textAlign='center'
              >
                <Text fontSize='lg'>{itemText}</Text>
              </Box>
            )}
            <Divider w='80%' m='10px auto' p='1px' bgColor='gray.300' />
          </Box>
        )
      })}
    </IISContainer >
  )
}

export default ItemImagesSwiper;