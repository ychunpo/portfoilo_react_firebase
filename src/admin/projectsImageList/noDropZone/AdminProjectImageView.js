import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { listAll, ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import {
  Box, Button, ButtonGroup, Flex, Heading, Image, Input, Spacer,
  Text, Wrap, WrapItem, VStack
} from '@chakra-ui/react';
import { storage } from '../../../utils/firebase';

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
    border: 0;
    font-size: 1.1rem;
    color: black;
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
  const [allImages, setAllImages] = useState([]);
  //console.log('G - allImages', allImages)
  const [imagesData, setImagesData] = useState([]);
  console.log('G - imagesData', imagesData)
  const [images, setImages] = useState([]);
  //console.log('images', images);
  const [imagesPath, setImagesPath] = useState([]);
  const [showData, setShowData] = useState(false);

  function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log('ImagesArray', ImagesArray);
    setImagesPath([...imagesPath, ...ImagesArray]);

    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      //newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
    //console.log("images", images);
  }
  function deleteFile(e) {
    const s = images.filter((item, index) => index !== e);
    setImages(s);
    //console.log(s);
  }

  const refreshPage = () => {
    //window.location.replace(window.location.href);
    window.location.reload();
  }

  const getFromStorage = () => {
    // await listAll(imagesListRef).then((res) => {
    //   setAllImages(res.items);    
    // }).catch((error) => {
    //   console.log(error);
    // });

    listAll(imagesListRef).then((res) => {
      let items = res.items;
      let array = [];
      let files = [];
      console.log('files', files)
      setAllImages(res.items);
      items.forEach((resRef) => {
        getDownloadURL(resRef).then((url) => {
          // if (array.indexOf(url) === -1) {
          //   array.push(url)
          // }
          // if (imagesData.length < array.length) {
          //   await imagesData.push({ name: resRef.name, url: url });
          //   files.push({ name: resRef.name, url: url });
          // }
          files.push({ name: resRef.name, url: url });

        });

      });
      setImagesData(...files);
    }).catch((error) => {
      console.log(error);
    });
  };

  // const getFirebaseUrl = () => {
  //   let array = [];
  //   let files = [];
  //   allImages.forEach((resRef) => {
  //     //console.log('getFirebaseUrl - resRef', resRef)
  //     getDownloadURL(resRef).then(async (url) => {
  //       console.log('getFirebaseUrl - url', url)

  //       if (array.indexOf(url) === -1) {
  //         await array.push(url)
  //       }
  //       if (imagesData.length < array.length) {
  //         await imagesData.push({ name: resRef.name, url: url });
  //         await files.push({ name: resRef.name, url: url });
  //       }
  //     });
  //   });
  //   setImagesData(files);
  // }

  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      let items = res.items;
      let array = [];
      let files = [];
      setAllImages(res.items);
      items.forEach((resRef) => {
        getDownloadURL(resRef).then(async (url) => {
          if (array.indexOf(url) === -1) {
            await array.push(url)
          }
          if (imagesData.length < array.length) {
            //await imagesData.push({ name: resRef.name, url: url });
            await files.push({ name: resRef.name, url: url });
          }
        });
        setImagesData(files);
      });
    }).catch((error) => {
      console.log(error);
    });
    //setShowData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesPath]);

  const uploadToStorage = () => {
    if (images.length !== 0) {
      //console.log('images', images)
      images.forEach((img) => {
        //console.log('img', img)
        let imageRef = ref(storage, `/images/${img.name}`);
        //console.log('imageRef', imageRef)
        uploadBytes(imageRef, img).then((imgUrl) => {
          //console.log('imgUrl: ', imgUrl)
        });
      });
      toast("Image uploaded successfully", { type: "success" });
    } else {
      toast("Please upload an image first.", { type: "error" });
    }
  }

  const deleteFromStorage = async (filename) => {
    let imageRef = ref(storage, `/images/${filename}`);
    await deleteObject(imageRef).then(() => {
      setAllImages(allImages.filter((item) => item.name !== filename));
      toast("Image deleted successfully", { type: "success" });
    }).catch((err) => {
      console.log(err);
    });
    //refreshPage();
    //setShowData(false)
  };

  return (
    <APIVContainer>
      <Box align="center">

        <Heading size='xl' pt="12px">
          Image List
        </Heading>
        <Box m="15px 0">
          <VStack>

            <Box>
              {imagesPath.length > 0 &&
                imagesPath.map((item, index) => {
                  return (
                    <Flex
                      key={item}
                      align='center'
                      gap={3}
                    >
                      <Image
                        src={item}
                        boxSize='300px'
                        fallbackSrc='https://via.placeholder.com/300'
                      />
                      <Button onClick={() => deleteFile(index)}>
                        Delete
                      </Button>
                    </Flex>
                  );
                })}
            </Box>
            <Box>
              <Input
                type="file"
                disabled={images.length === 5}
                onChange={uploadSingleFile}
                multiple
              />
            </Box>

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
              <Button
                w="150px"
                onClick={() => {
                  //setShowData(false)
                  refreshPage();
                }}>
                Clear Screen
              </Button>
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
        <Box m="5px auto">
          <Text>Total: {imagesData.length} Files</Text>
          <Wrap m="5px auto" justify='center'>
            {
              imagesData.map((item, index) => {
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
        </Box>)
      }
    </APIVContainer >
  )
}

export default AdminProjectImageView;