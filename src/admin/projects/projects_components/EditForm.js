import React from 'react';

import { toast } from 'react-toastify';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';

import styled from "styled-components";
import {
  Button,
  ButtonGroup,
  Box,
  Divider,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Text,
  Heading
} from '@chakra-ui/react';

const StyledContainer = styled.div`  
  .editform-label-size {
    font-size: 1.2rem;
  }

  .editform-heading-size {
    font-size: 1.5rem;
  }
`


const EditForm = ({ data, handleCancel, handleUpdate }) => {

  return (
    <>
      <StyledContainer>
        <Box>
          <form>
            <Heading className='editform-heading-size'>Project Info</Heading>
            <Box>
              <FormControl>
                <FormLabel className='editform-label-size'>Rank</FormLabel>
                <NumberInput defaultValue={data.rank} min={0} allowMouseWheel>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel className='editform-label-size'>Title</FormLabel>
                <Input placeholder={data.title} />
              </FormControl>
              <FormControl>
                <FormLabel className='editform-label-size'>Use</FormLabel>
                <Input placeholder={data.use} />
              </FormControl>
              <FormControl>
                <FormLabel className='editform-label-size'>Description</FormLabel>
                <Input placeholder={data.description} />
              </FormControl>
              <FormControl>
                <FormLabel className='editform-label-size'>Code</FormLabel>
                <Input placeholder={data.codeUrl} />
              </FormControl>
              <FormControl>
                <FormLabel className='editform-label-size'>UI/UX</FormLabel>
                <Input placeholder={data.uiuxUrl} />
              </FormControl>
              <FormControl>
                <FormLabel className='editform-label-size'>Website</FormLabel>
                <Input placeholder={data.websiteUrl} />
              </FormControl>
              <FormLabel className='editform-label-size'>Video</FormLabel>
              <Input placeholder={data.videoUrl} />
            </Box>
            <Heading className='editform-heading-size' align='center'>Cover</Heading>
            <Box>
              <FormLabel className='editform-label-size'>Caption</FormLabel>
              <Input placeholder={data.coverCaption} />
              <Stack direction='row'>
                <Image
                  boxSize='200px'
                  src={data.coverImagePath}
                  alt={data.coverCaption}
                  fallbackSrc='https://via.placeholder.com/200'
                />
              </Stack>
            </Box>
            <Heading className='editform-heading-size' align='center'>Items</Heading>







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