import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { listAll, ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import {
  Box, Button, ButtonGroup,
  Heading, Image, Input, Spacer,
  Text, Wrap, WrapItem, VStack
} from '@chakra-ui/react';
import { storage } from '../../../utils/firebase';
import ImageListAdd from '../components/ImageListAdd';

const APIVContainer = styled.div`
  text-align: center;
  background-color: #0d4956;
  weight: 100vw;
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
  const [images, setImages] = useState(null);
  //console.log('image', image);
  const [allImages, setAllImages] = useState([]);
  //console.log('allImages', allImages)
  const [downloadUrlData, setDownloadUrlData] = useState([]);
  //console.log('downloadUrlData', downloadUrlData)
  const [showData, setShowData] = useState(false);
  console.log('G - showData', showData)

  const refreshPage = () => {
    window.location.reload();
  }

  const getFromStorage = async () => {
    setAllImages([]);

    await listAll(imagesListRef).then((res) => {
      setAllImages(res.items);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getFromStorage();
  }, []);

  const getFirebaseUrl = () => {
    var array = [];
    setDownloadUrlData([]);
    allImages.forEach((resRef) => {
      getDownloadURL(resRef).then(async (url) => {
        if (array.indexOf(url) === -1) {
          await array.push(url)
        }
        if (downloadUrlData.length < array.length) {
          await downloadUrlData.push({ name: resRef.name, url: url });
        }
      });
    });

    return (
      <Box m="5px auto">
        <Text>Total: {downloadUrlData.length} Files</Text>
        <Wrap m="5px auto" justify='center'>
          {
            downloadUrlData.map((item, index) => {
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
                      fallbackSrc='https://via.placeholder.com/300'
                    />
                    <Text fontSize="sm" color='yellow'>File Name:</Text>
                    <Text fontSize="sm">{item.name}</Text>
                    <Text fontSize="sm" color='yellow'>File Url:</Text>
                    <Text fontSize="sm">{item.url}</Text>
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
    )
  }

  useEffect(() => {
    getFirebaseUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allImages]);

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImages([]);
    }
  };

  const uploadToStorage = () => {
    if (images.length !== 0) {
      console.log('image', images)
      let imageRef = ref(storage, `/images/${images.name}`);
      uploadBytes(imageRef, images).then((imgUrl) => {
        //console.log('imgUrl: ', imgUrl)    
        getFromStorage();
        setImages([]);
        toast("Image uploaded successfully", { type: "success" });
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
    refreshPage();
  };

  return (
    <APIVContainer>
      <Box align="center">
        <Heading
          size='xl'
          pt="12px"
        >Image List</Heading>
        <Box m="15px 0">
          <VStack>
            <Input
              w="70%"
              type="file"
              className="APIV-input"
              onChange={(e) => { onImageChange(e) }}
            />
            <Image ></Image>
            <Spacer />
            <ImageListAdd />
            <Spacer />
            <ButtonGroup gap={20}>
              <Button
                w="150px"
                onClick={() => {
                  uploadToStorage()
                  refreshPage()
                }}>
                Upload Image
              </Button>
              <Spacer />
              <Button
                w="150px"
                onClick={() => {
                  //setShowData(false)
                  refreshPage();
                }}>
                Clear Screen
              </Button>
              <Spacer />
              <Button
                w="150px"
                onClick={() => {
                  getFromStorage();
                  setShowData(true);
                }}
              >
                Get Images
              </Button>
            </ButtonGroup>
          </VStack>
        </Box>
      </Box>
      {showData && (
        getFirebaseUrl()
      )}
    </APIVContainer >
  )
}

export default AdminProjectImageView;