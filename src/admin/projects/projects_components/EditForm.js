import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from "react-hook-form";
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components";
import {
  Button, ButtonGroup, Box,
  Flex, FormControl, FormLabel,
  Heading,
  Input, Image,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Stack, VStack,
  Text, Textarea
} from '@chakra-ui/react';
import ImageItemAdd from './ImageItemAdd';

const StyledContainer = styled.div`
  .editForm-formControl {
    display: flex;
    align-items: flex-end;    
  }

  .editForm-label-size {
    font-size: 1rem;    
  }

  .editForm-heading-size {
    font-size: 1.4rem;
  }
`

const EditForm = ({ data, handleCancel, handleUpdate, updateImageRecord }) => {
  //console.log('Start => data', data);
  //const [projectData, setProjectData] = useState(...data);
  //setProjectData(...data)
  //console.log('Start => projectData', projectData);

  const methods = useForm();
  const {
    control, register, formState: { errors }, watch, handleSubmit
  } = methods;

  return (
    <StyledContainer>
      <Box>
        <Box>
          <Box>
            <Heading className='editForm-heading-size' align='center'>Project Info</Heading>
            <FormControl className='editForm-formControl'>
              <FormLabel className='editForm-label-size'>Rank</FormLabel>
              <NumberInput value={data.rank} min={0} allowMouseWheel>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl className='editForm-formControl'>
              <FormLabel className='editForm-label-size'>Title</FormLabel>
              <Input placeholder={data.title} />
            </FormControl>
            <FormControl className='editForm-formControl'>
              <FormLabel className='editForm-label-size'>Use</FormLabel>
              <Input placeholder={data.use} />
            </FormControl>
            <FormControl className='editForm-formControl'>
              <FormLabel className='editForm-label-size'>Description</FormLabel>
              <Input placeholder={data.description} />
            </FormControl>
            <FormControl className='editForm-formControl'>
              <FormLabel className='editForm-label-size'>Code</FormLabel>
              <Input placeholder={data.gitUrl} />
            </FormControl>
            <FormControl className='editForm-formControl'>
              <FormLabel className='editForm-label-size'>UI/UX</FormLabel>
              <Input placeholder={data.uiuxUrl} />
            </FormControl>
            <FormControl className='editForm-formControl'>
              <FormLabel className='editForm-label-size'>Website</FormLabel>
              <Input placeholder={data.websiteUrl} />
            </FormControl>
            <FormControl className='editForm-formControl'>
              <FormLabel className='editForm-label-size'>Video</FormLabel>
              <Input placeholder={data.videoUrl} />
            </FormControl>
          </Box>
          <Box>
            <Text>Upload New Image</Text>
            <ImageItemAdd />
          </Box>

          <Box>
            <Heading className='editForm-heading-size' align='center'>Cover</Heading>
            <Box border="1px solid red">
              <FormControl className='editForm-formControl'>
                <FormLabel className='editForm-label-size'>Caption</FormLabel>
                <Input placeholder={data.coverCaption} />
              </FormControl>
              <Stack
                direction='row'
              >
                <Image
                  boxSize='150px'
                  objectFit='contain'
                  src={data.coverImagePath}
                  alt={data.coverCaption}
                  fallbackSrc='https://via.placeholder.com/150'
                />
                <FormControl className='editForm-formControl'>
                  <Box>
                    <FormLabel className='editForm-label-size'>Path</FormLabel>
                    <Textarea w="550px" placeholder={data.coverImagePath} />
                  </Box>
                </FormControl>
              </Stack>
            </Box>
          </Box>

          <Box>
            <Heading className='editForm-heading-size' align='center'>Items</Heading>
            {data?.items?.map(item => {
              return (
                <Box border="1px solid red" key={item.itemId}>
                  <Stack direction='column'>
                    {item?.images?.map(img => {
                      return (
                        <Stack direction='row' key={img.imageId}>
                          <Image
                            boxSize='150px'
                            objectFit='contain'
                            src={img.imagePath}
                            alt={img.imageName}
                            fallbackSrc='https://via.placeholder.com/150'
                          />
                          <FormControl className='editForm-formControl'>
                            <Box>
                              <FormLabel className='editForm-label-size'>Path</FormLabel>
                              <Textarea w="550px" placeholder={img.imagePath} />
                            </Box>
                          </FormControl>
                        </Stack>
                      )
                    })}
                  </Stack>
                  <FormControl className='editForm-formControl'>
                    <FormLabel className='editForm-label-size'>ID</FormLabel>
                    <Input placeholder={item.itemId} />
                  </FormControl>
                  <FormControl className='editForm-formControl'>
                    <FormLabel className='editForm-label-size'>Caption</FormLabel>
                    <Input placeholder={item.caption} />
                  </FormControl>
                  <FormControl className='editForm-formControl'>
                    <FormLabel className='editForm-label-size'>Text</FormLabel>
                    <Input placeholder={item.text} />
                  </FormControl>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Flex
          height="10vh"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <ButtonGroup variant='outline' spacing='300px'>
            <Button
              colorScheme='red'
              onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              onClick={() => handleUpdate(data)}
            >
              Update
            </Button>
          </ButtonGroup>
        </Flex>
      </Box>
    </StyledContainer>
  )
}

export default EditForm;