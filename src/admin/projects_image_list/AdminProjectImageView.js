import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { listAll, ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import {
  Box, Button, ButtonGroup,
  Container, Flex, Heading,
  Image, Input, Spacer,
  HStack, Text, Textarea,
  Wrap, WrapItem, VStack
} from '@chakra-ui/react';
import { storage } from '../../utils/firebase';

const APIVContainer = styled.div`
  text-align: center;
  background-color: #0d4956;
  min-height: 100vh;
  display: flex;
  flex: 3;
  flex-direction: column;  
  font-size: calc(10px + 0.7rem);
  color: white;

  button {    
    cursor: pointer;
    background-color: lightblue;
    border: 0;
    font-size: 1.1rem;
    color: blue;
  }

  .APIV-image {
    position: relative;
  }  
  .APIV-image button {
    display: none;
    background-color: red;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0;
  }

  .APIV-image:hover button {
    display: block;    
  }
`

const AdminProjectImageView = () => {
  const imagesListRef = ref(storage, 'images');
  //console.log('imagesListRef', imagesListRef);
  const [allImages, setAllImages] = useState([]); //ok
  console.log('allImages', allImages)
  const [image, setImage] = useState(null); //ok
  //console.log('image', image);
  const [imagesData, setImagesData] = useState([]); //ok
  console.log('imagesData', imagesData)

  useEffect(() => {
    getFromStorage();
  }, []);

  const getFromStorage = async () => {
    setAllImages([]);
    setImagesData([]);
    await listAll(imagesListRef).then((res) => {
      //console.log('res:', res.items.length);
      setAllImages(res);
      res.items.forEach((resRef) => {
        console.log('resRef', resRef)
        getDownloadURL(resRef).then((url) => {
          if (allImages.indexOf(url) === -1) {
            setImagesData((prev) => [...prev, { name: resRef.name, url: url }]);
          };
        });
      });
    }).catch((error) => {
      console.log(error);
    });


  };

  const clearImages = () => {
    let arr = [];

  }

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const uploadToStorage = () => {
    if (image) {
      console.log('image', image)
      let imageRef = ref(storage, `/images/${image.name}`);
      uploadBytes(imageRef, image).then((imgUrl) => {
        console.log('imgUrl: ', imgUrl)
        // getDownloadURL(imageRef).then((url) => {
        //   if (allImages.url.indexOf(url) < 0) {
        //     setAllImages((allImages) => [...allImages, url]);
        //   }
        //   toast("Image uploaded successfully", { type: "success" });
        // });
        getFromStorage();
      });
    } else {
      toast("Please upload an image first.", { type: "success" });
    }
  }

  const deleteFromStorage = (filename) => {
    let imageRef = ref(storage, `/images/${filename}`);
    deleteObject(imageRef).then(() => {
      setAllImages(allImages.filter((item) => item.name !== filename));
      toast("Image deleted successfully", { type: "success" });
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <APIVContainer>
      <Box align="center">
        <Heading as='h4' size='lg'>Image List</Heading>
        <Box m="15px 0">
          <VStack justify="center">
            <input
              type="file"
              onChange={(e) => { onImageChange(e) }}
            />
            <Spacer />
            <ButtonGroup gap={20}>
              <Button
                w="150px"
                onClick={() => uploadToStorage()}>
                Upload Image
              </Button>
              <Spacer />
              <Button
                w="150px"
                onClick={() => { getFromStorage() }}>
                Clear Images
              </Button>
              <Button
                w="150px"
                onClick={() => { getFromStorage() }}>
                Get Images
              </Button>
            </ButtonGroup>
          </VStack>
        </Box>
      </Box>

      <Box m="5px auto">
        <Wrap m="5px auto" justify='center'>
          {
            imagesData.map((item, index) => {
              //console.log('item', item)
              return (
                <WrapItem key={index}>
                  <Box
                    m="10px"
                    w="300px"
                    className="APIV-image"
                  >
                    <Image
                      boxSize='300px'
                      src={item.url}
                      alt={item.name}
                      fallbackSrc='https://via.placeholder.com/150'
                    />
                    <Button
                      onClick={() => deleteFromStorage(item.name)}
                    >
                      Delete
                    </Button>
                  </Box>
                </WrapItem>
              );
            })
          }
        </Wrap>
      </Box>
    </APIVContainer >
  )
}

export default AdminProjectImageView;