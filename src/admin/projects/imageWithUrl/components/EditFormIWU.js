import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styled from "styled-components";
import {
  Alert, AlertIcon, AlertTitle, AlertDescription, useDisclosure,
  Button, ButtonGroup, Box, CloseButton, Divider,
  FormControl, FormLabel, Flex, Grid, GridItem,
  Heading, Input, Image,
  Stack, Textarea, Spacer, VStack, HStack,
} from '@chakra-ui/react';
import { db } from '../../../../utils/firebase';

const StyledContainer = styled.div`

`

const EditFormIWU = ({ data, id }) => {
  const navigation = useNavigate();
  const docRef = doc(db, "Projects", id);
  const [saveData, setSaveData] = useState(data);
  const [projectData, setProjectData] = useState(data);
  //console.log('Start => projectData', projectData);
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const getDataWithId = async () => {
    try {
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSaveData(docSnap.data());
        setProjectData(docSnap.data());

      } else {
        console.log("Document does not exist")
        toast("Document does not exist", { type: "error" });
      }
    } catch (error) {
      console.log('getDate error', error)
      //toast(`Error: ${error}`, { type: "error" });
    }
  }

  useEffect(() => {
    getDataWithId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function SuccessAddItem() {
    setTimeout(() => {
      onClose();
    }, 3000);
    return isVisible ? (
      <Alert status='success'>
        <AlertIcon />
        <Box>
          <AlertTitle>Adding Success!</AlertTitle>
          <AlertDescription>
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='flex-start'
          position='relative'
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
    ) : (
      <></>
    );
  }

  const handleInfoCoverCharge = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setProjectData((perv) => ({ ...perv, [name]: value }));
  }

  const handleItemsCharge = (index) => (e) => {
    let value = e.target.value;
    let name = e.target.name;
    let newData = { ...projectData };
    newData.items[index][name] = value;
    setProjectData(newData);
  }

  const handleImagesCharge = (index, idx) => (e) => {
    let value = e.target.value;
    let name = e.target.name;
    console.log('name', name)
    let newData = { ...projectData };
    //console.log('link: ', newData.items[index].itemImages[idx][name])
    newData.items[index].itemImages[idx][name] = value;
    setProjectData(newData);
    console.log('handleImagesCharge => projectData', projectData);
  }

  const handleAddImage = (id) => {
    //console.log('id', id)

    let data = { ...projectData }
    data.items[id].itemImages.push({
      itemImageId: projectData.items[id].itemImages.length,
      itemImageFilename: '',
      itemImagePath: '',
    });
    setProjectData(data);
    //console.log('add image->projectData', projectData)
    onOpen();
    return;
  }

  const handleCancel = () => {
    navigation('/admin/projects');
  }

  const handleReset = () => {
    setProjectData(saveData);
    window.location.reload();
  }

  const handleAddItems = () => {
    if (projectData.items.length === 0) {
      projectData.items.push({
        itemId: 0,
        itemCaption: '',
        itemText: '',
        itemImages: [{ itemImageId: 0, itemImageFilename: "", itemImagePath: "" }]
      });
    } else {
      projectData.items.push({
        itemId: projectData.items.length,
        itemCaption: '',
        itemText: '',
        itemImages: [{ itemImageId: 0, itemImageFilename: "", itemImagePath: "" }]
      });
    }
    onOpen();
  }

  const handleUpdateData = async (data) => {
    await setDoc(docRef, data)
      .then(docRef => {
        window.location.reload();
        //toast("Update Success", { type: "success" });
      }).catch(error => {
        console.log('update error', error)
        toast(`Error: ${error}`, { type: "error" });
      })
  }

  const handleDeleteImage = async (itemId, itemImageId) => {
    let result = saveData.items[itemId].itemImages.filter(img => img.itemImageId !== itemImageId);
    let data = { ...saveData };
    data.items[itemId].itemImages = [];
    result.forEach(item => {
      data.items[itemId].itemImages.push(item);
    })
    setSaveData(data);
    setProjectData(saveData);

    await setDoc(docRef, data)
      .then(docRef => {
        toast("Update Success", { type: "success" });
      }).catch(error => {
        console.log('update error', error)
        toast(`Error: ${error}`, { type: "error" });
      });
    //window.location.reload();
  }

  return (
    <StyledContainer>
      <Box>
        <Box>
          <Heading p="10px 5px" fontSize="2xl" color="orange.400">
            Info
          </Heading>
          <FormControl p="5px">
            <Grid templateColumns='20% 80%' alignItems="center">
              <GridItem>
                <FormLabel m='auto 0' fontSize="lg">Rank:</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  name="rank"
                  placeholder={projectData.rank}
                  onChange={handleInfoCoverCharge}
                />
              </GridItem>
            </Grid>
          </FormControl>

          <FormControl p="5px">
            <Grid templateColumns='20% 80%' alignItems="center">
              <GridItem>
                <FormLabel m="auto 0" fontSize="lg">Title:</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  name="title"
                  placeholder={projectData.title}
                  onChange={handleInfoCoverCharge}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl p="5px">
            <Grid templateColumns='20% 80%' alignItems="center">
              <GridItem>
                <FormLabel m="auto 0" fontSize="lg">Use:</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  name="use"
                  placeholder={projectData.use}
                  onChange={handleInfoCoverCharge}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl p="5px">
            <Grid templateColumns='20% 80%' alignItems="center">
              <GridItem>
                <FormLabel m="auto 0" fontSize="lg">Description:</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  name="description"
                  placeholder={projectData.description}
                  onChange={handleInfoCoverCharge}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl p="5px">
            <Grid templateColumns='20% 80%' alignItems="center">
              <GridItem>
                <FormLabel m="auto 0" fontSize="lg">Git:</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  name="gitUrl"
                  placeholder={projectData.gitUrl}
                  onChange={handleInfoCoverCharge}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl p="5px">
            <Grid templateColumns='20% 80%' alignItems="center">
              <GridItem>
                <FormLabel m="auto 0" fontSize="lg">UI/UX:</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  name="uiuxUrl"
                  placeholder={projectData.uiuxUrl}
                  onChange={handleInfoCoverCharge}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl p="5px">
            <Grid templateColumns='20% 80%' alignItems="center">
              <GridItem>
                <FormLabel m="auto 0" fontSize="lg">Website:</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  name="websiteUrl"
                  placeholder={projectData.websiteUrl}
                  onChange={handleInfoCoverCharge}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl p="5px">
            <Grid templateColumns='20% 80%' alignItems="center">
              <GridItem>
                <FormLabel m="auto 0" fontSize="lg">Video:</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  name="videoUrl"
                  placeholder={projectData.videoUrl}
                  onChange={handleInfoCoverCharge}
                />
              </GridItem>
            </Grid>
          </FormControl>
        </Box>

        <Box>
          <Heading p="15px 0" fontSize="2xl" color="orange.400">
            Cover
          </Heading>
          <Box border="1px solid red">
            <Stack direction='row'>
              <Image
                m="16px"
                boxSize='200px'
                objectFit='contain'
                src={projectData.coverImagePath}
                alt={projectData.coverCaption}
                fallbackSrc='https://via.placeholder.com/150'
              />
              <VStack w='100%' p="20px 5px" gap={1} >
                <FormControl>
                  <Flex alignItems="center" gap={12} >
                    <FormLabel fontSize="lg">
                      Path:
                    </FormLabel>
                    <Textarea
                      borderColor="white"
                      name="coverImagePath"
                      h="110px"
                      m='0 auto'
                      placeholder={projectData.coverImagePath}
                      onChange={handleInfoCoverCharge}
                    />
                  </Flex>
                </FormControl>
                <FormControl >
                  <Flex alignItems="center" gap={8}>
                    <FormLabel m="auto" fontSize="lg">
                      Caption:
                    </FormLabel>
                    <Input
                      name="coverCaption"
                      placeholder={projectData.coverCaption}
                      onChange={handleInfoCoverCharge}
                    />
                  </Flex>
                </FormControl>
                <FormControl >
                  <Flex alignItems="center" gap={6}>
                    <FormLabel m="auto" fontSize="lg">
                      Filename:
                    </FormLabel>
                    <Input
                      name="coverImageFilename"
                      placeholder={projectData.coverImageFilename}
                      onChange={handleInfoCoverCharge}
                    />
                  </Flex>
                </FormControl>
              </VStack>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Heading p="15px 0" fontSize="2xl" color="orange.400">
            Items
          </Heading>
          {projectData?.items?.map((item, index) => {
            return (
              <Box
                key={item.itemId}
                mb="5px"
                p="0 5px 15px 5px"
                border="1px solid red"
              >

                <Grid
                  p='10px 5px'
                  templateColumns='repeat(3, 1fr)'
                  gap={5}
                >
                  <GridItem>
                    <FormControl pl="5px">
                      <Flex alignItems="center" gap={5}>
                        <FormLabel m="auto" fontSize="lg">ID:</FormLabel>
                        <Input
                          name="itemId"
                          placeholder={item.itemId}
                          onChange={handleItemsCharge(index)}
                        />
                      </Flex>
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl pl="5px">
                      <Flex alignItems="center" gap={5}>
                        <FormLabel m="auto" fontSize="lg">Caption:</FormLabel>
                        <Input
                          name="itemCaption"
                          placeholder={item.itemCaption}
                          onChange={handleItemsCharge(index)}
                        />
                      </Flex>
                    </FormControl>
                  </GridItem>
                </Grid>
                <FormControl pl="10px">
                  <Flex alignItems="center" >
                    <FormLabel m='0 auto' fontSize="lg">Text:</FormLabel>
                    <Input
                      m="0 20px"
                      name="itemText"
                      placeholder={item.itemText}
                      onChange={handleItemsCharge(index)}
                    />
                  </Flex>
                </FormControl>
                <Divider m='5px auto' p='1px' w='90%' />
                <Stack direction='column' p='5px 0'>
                  {item?.itemImages?.map((img, idx) => {
                    return (
                      <Box key={img.itemImageId}>
                        <Stack
                          direction='row'
                          alignItems="center">
                          <Image
                            m="0 8px"
                            boxSize='200px'
                            objectFit='contain'
                            src={img.itemImagePath}
                            alt={img.itemImageFilename}
                            fallbackSrc='https://via.placeholder.com/150'
                          />
                          <VStack w='100%'>
                            <FormControl pl="10px">
                              <FormLabel m='0 auto' fontSize="lg">Image ID:</FormLabel>
                              <Input
                                name="itemImageId"
                                placeholder={img.itemImageId}
                                onChange={handleImagesCharge(index, idx)}
                              />
                            </FormControl>
                            <FormControl pl="10px">
                              <FormLabel m='0 auto' fontSize="lg">Image Name:</FormLabel>
                              <Input
                                name="itemImageFilename"
                                placeholder={img.itemImageFilename}
                                onChange={handleImagesCharge(index, idx)}
                              />
                            </FormControl>
                            <FormControl pl="10px">
                              <FormLabel m='0 auto' fontSize="lg">Image Path:</FormLabel>
                              <Textarea
                                name="itemImagePath"
                                h="150px"
                                placeholder={img.itemImagePath}
                                onChange={(handleImagesCharge(index, idx))}
                              />
                            </FormControl>
                          </VStack>
                          <Button
                            variant='outline'
                            colorScheme='red'
                            onClick={() => handleDeleteImage(item.itemId, img.itemImageId, 'img.itemImageName')}
                          >
                            Delete
                          </Button>
                        </Stack>
                        <Divider m='5px auto' p='1px' bgColor='black' w='90%' />
                      </Box>
                    )
                  })}
                </Stack>
                <HStack pt='20px' justify="space-evenly">
                  <Button
                    colorScheme='red'
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <Button
                    colorScheme='green'
                    onClick={() => handleAddImage(item.itemId)}
                  >
                    Add Image
                  </Button>
                </HStack>
              </Box>
            )
          })}
          {SuccessAddItem()}
        </Box>

        <Stack
          height="10vh"
          justify="space-evenly"
          alignItems="center"
        >
          <ButtonGroup
            w="90%"
            variant='outline'
          >
            <Button
              w='110px'
              colorScheme='purple'
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Spacer />
            <Button
              w='110px'
              colorScheme='red'
              onClick={handleReset}
            >
              Reset
            </Button>
            <Spacer />
            <Button
              w='110px'
              colorScheme='green'
              onClick={handleAddItems}
            >
              Add Item
            </Button>
            <Spacer />
            <Button
              w='110px'
              colorScheme='blue'
              onClick={() => handleUpdateData(projectData)}
            >
              Update
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </StyledContainer >
  )
}

export default EditFormIWU;