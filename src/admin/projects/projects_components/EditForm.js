import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components";
import {
  Button, ButtonGroup, Box,
  Divider,
  Editable, EditableInput, EditableTextarea, EditablePreview,
  Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText,
  Heading,
  Input, Image,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Stack,
  Text,
} from '@chakra-ui/react';

const StyledContainer = styled.div`
  .editform-formcontrol {
    display: flex;
    align-items: flex-end;
    
  }

  .editform-label-size {
    font-size: 1rem;
    
  }

  .editform-heading-size {
    font-size: 1.4rem;
  }
`

const EditForm = ({ data, handleCancel, handleUpdate }) => {
  console.log('Start => data', data);
  //const [projectData, setProjectData] = useState(...data);
  //setProjectData(...data)
  //console.log('Start => projectData', projectData);
  return (
    <>
      <StyledContainer>
        <Box>
          <form>
            <Heading className='editform-heading-size' align='center'>Project Info</Heading>
            <Box>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>Rank</FormLabel>
                <NumberInput value={data.rank} min={0} allowMouseWheel>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>Title</FormLabel>
                <Input placeholder={data.title} />
              </FormControl>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>Use</FormLabel>
                <Input placeholder={data.use} />
              </FormControl>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>Description</FormLabel>
                <Input placeholder={data.description} />
              </FormControl>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>Code</FormLabel>
                <Input placeholder={data.gitUrl} />
              </FormControl>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>UI/UX</FormLabel>
                <Input placeholder={data.uiuxUrl} />
              </FormControl>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>Website</FormLabel>
                <Input placeholder={data.websiteUrl} />
              </FormControl>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>Video</FormLabel>
                <Input placeholder={data.videoUrl} />
              </FormControl>
            </Box>
            <Heading className='editform-heading-size' align='center'>Cover</Heading>
            <Box>
              <FormControl className='editform-formcontrol'>
                <FormLabel className='editform-label-size'>Caption</FormLabel>
                <Input placeholder={data.coverCaption} />
              </FormControl>
              <Stack direction='row'>
                <Image
                  boxSize='150px'
                  objectFit='contain'
                  src={data.coverImagePath}
                  alt={data.coverCaption}
                  fallbackSrc='https://via.placeholder.com/150'
                />
              </Stack>
            </Box>
            <Heading className='editform-heading-size' align='center'>Items</Heading>
            {data?.items?.map(item => {
              return (
                <Box key={item.itemId}>
                  <Stack direction='row'>
                    {item?.images?.map(img => {
                      return (
                        <div key={img.imageId}>
                          <Image
                            boxSize='150px'
                            objectFit='contain'
                            src={img.imagePath}
                            alt={img.imageName}
                            fallbackSrc='https://via.placeholder.com/150'
                          />
                        </div>
                      )
                    })}
                  </Stack>
                  <FormControl className='editform-formcontrol'>
                    <FormLabel className='editform-label-size'>ID</FormLabel>
                    <Input placeholder={item.itemId} />
                  </FormControl>
                  <FormControl className='editform-formcontrol'>
                    <FormLabel className='editform-label-size'>Caption</FormLabel>
                    <Input placeholder={item.caption} />
                  </FormControl>
                  <FormControl className='editform-formcontrol'>
                    <FormLabel className='editform-label-size'>Text</FormLabel>
                    <Input placeholder={item.text} />
                  </FormControl>
                </Box>
              )
            })}

          </form>
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
    </>
  )
}

export default EditForm;