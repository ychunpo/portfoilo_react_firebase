import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components";
import {
  Alert, AlertIcon, AlertTitle, AlertDescription, useDisclosure,
  Button, ButtonGroup, Box, CloseButton,
  FormControl, FormLabel, Flex, Grid, GridItem,
  Heading, Input, Image,
  Stack, Text, Textarea, Spacer, VStack, HStack,
} from '@chakra-ui/react';
import { db } from '../../../utils/firebase';
import ImageItemAdd from './ImageItemAdd';

const StyledContainer = styled.div`

`

const EditForm = ({ data, id }) => {
  const navigation = useNavigate();
  const docRef = doc(db, "Projects", id);
  const [saveData, setSaveData] = useState(data);
  const [projectData, setProjectData] = useState(data);
  console.log('Start => projectData', projectData);
  //const [inputData, setInputData] = useState(data);
  //console.log('Start => inputData', inputData);
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  let itemsNumber = 0;

  const getDataWithId = async () => {
    try {
      let docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await setSaveData(docSnap.data());
        await setProjectData(docSnap.data());

      } else {
        console.log("Document does not exist")
        //toast("Document does not exist", { type: "error" });
      }
    } catch (error) {
      console.log('getDate error', error)
      //toast(`Error: ${error}`, { type: "error" });
    }
  }

  useEffect(() => {
    getDataWithId();
  }, []);

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

  const handleInputCharge = (e) => {
    e.preventDefault();
    let value = e.target.value;
    //console.log("target.value", value);
    let name = e.target.name;
    //console.log("target.name", name);
    setProjectData((perv) => {
      return { ...perv, [name]: value }
    });
    console.log('in-handleInputCharge > inputData', projectData);
  }

  const handleAddImage = (id) => {
    projectData.items[id].images.push({
      imageId: projectData.items[id].images.length,
      imageName: '',
      imagePath: '',
    });
    console.log('add image->projectData', projectData)
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
        caption: '',
        images: [{ imageId: 0, imageName: "", imagePath: "" }]
      });
    } else {
      projectData.items.push({
        itemId: projectData.items.length,
        caption: `caption${projectData.items.length}`,
        images: [{ imageId: 0, imageName: "", imagePath: "" }]
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

  return (
    <StyledContainer>
      <Box>
        <Box>
          <Heading p="10px 5px" fontSize="2xl" color="orange.400">
            Info
          </Heading>
          <FormControl pl="5px">
            <Flex gap={2}>
              <FormLabel m="auto" fontSize="lg">Rank:</FormLabel>
              <Input
                name="rank"
                placeholder={projectData.rank}
                onChange={handleInputCharge}
              />
            </Flex>
          </FormControl>
          <FormControl pl="5px">
            <Flex gap={2}>
              <FormLabel m="auto" fontSize="lg">Title:</FormLabel>
              <Input
                name="title"
                placeholder={projectData.title}
                onChange={handleInputCharge}
              />
            </Flex>
          </FormControl>
          <FormControl pl="5px">
            <Flex gap={2}>
              <FormLabel m="auto" fontSize="lg">Use:</FormLabel>
              <Input
                name="use"
                placeholder={projectData.use}
                onChange={handleInputCharge}
              />
            </Flex>
          </FormControl>
          <FormControl pl="5px">
            <Flex gap={2}>
              <FormLabel m="auto" fontSize="lg">Description:</FormLabel>
              <Input
                name="description"
                placeholder={projectData.description}
                onChange={handleInputCharge}
              />
            </Flex>
          </FormControl>
          <FormControl pl="5px">
            <Flex gap={2}>
              <FormLabel m="auto" fontSize="lg">Git:</FormLabel>
              <Input
                name="gitUrl"
                placeholder={projectData.gitUrl}
                onChange={handleInputCharge}
              />
            </Flex>
          </FormControl>
          <FormControl pl="5px">
            <Flex gap={2}>
              <FormLabel m="auto" fontSize="lg">UI/UX:</FormLabel>
              <Input
                name="uiuxUrl"
                placeholder={projectData.uiuxUrl}
                onChange={handleInputCharge}
              />
            </Flex>
          </FormControl>
          <FormControl pl="5px">
            <Flex gap={2}>
              <FormLabel m="auto" fontSize="lg">Website:</FormLabel>
              <Input
                name="websiteUrl"
                placeholder={projectData.websiteUrl}
                onChange={handleInputCharge}
              />
            </Flex>
          </FormControl>
          <FormControl pl="5px">
            <Flex gap={2}>
              <FormLabel m="auto" fontSize="lg">Video:</FormLabel>
              <Input
                name="videoUrl"
                placeholder={projectData.videoUrl}
                onChange={handleInputCharge}
              />
            </Flex>
          </FormControl>
        </Box>
        <Box p="5px">
          <Text as="b">Upload New Image</Text>
          <ImageItemAdd />
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
              <VStack w='100%' p="20px" gap={1} >
                <FormControl>
                  <Flex alignItems="center" gap={9} >
                    <FormLabel fontSize="lg">
                      Path:
                    </FormLabel>
                    <Textarea
                      borderColor="white"
                      name="coverImagePath"
                      h="140px"
                      m='0 auto'
                      placeholder={projectData.coverImagePath}
                      onChange={handleInputCharge}
                    />
                  </Flex>
                </FormControl>
                <FormControl >
                  <Flex alignItems="center" gap={5}>
                    <FormLabel m="auto" fontSize="lg">
                      Caption:
                    </FormLabel>
                    <Input
                      name="coverCaption"
                      placeholder={projectData.coverCaption}
                      onChange={handleInputCharge}
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
          {projectData?.items?.map(item => {
            itemsNumber = item.itemId;
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
                          onChange={handleInputCharge}
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
                          placeholder={item.caption}
                          onChange={handleInputCharge}
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
                      placeholder={item.text}
                      onChange={handleInputCharge}
                    />
                  </Flex>
                </FormControl>

                <Stack direction='column'>
                  {item?.images?.map(img => {

                    return (
                      <Stack key={img.imageId} direction='row' alignItems="center">
                        <Image
                          m="0 8px"
                          boxSize='200px'
                          objectFit='contain'
                          src={img.imagePath}
                          alt={img.imageName}
                          fallbackSrc='https://via.placeholder.com/150'
                        />
                        <FormControl p="20px 20px">
                          <Flex alignItems="center" gap={7}>
                            <FormLabel fontSize="lg">Path:</FormLabel>
                            <Textarea
                              name="itemImagePath"
                              h="150px"
                              placeholder={img.imagePath}
                              onChange={handleInputCharge}
                            />
                          </Flex>
                        </FormControl>
                      </Stack>
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

export default EditForm;