import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';
import {
  Button, ButtonGroup, Flex, FormControl, FormLabel, FormHelperText,
  Input, Select, Textarea, Stack,
} from '@chakra-ui/react'
import styled from "styled-components";

const FCFContainer = styled.div`
  width: 82vw; 
  margin: 50px auto;  
  padding: 10px;
  border-radius: 20Px;
  background-color: rgba(255,255,255,0.6);

  .FCFC-form-resize {    
    margin: 15px auto;
    padding: 15px 0px;
    width: 72vw;  
    display: grid;
    grid-template-columns: 1fr 1fr; 
    place-items: center;
  }

  .FCFC-left {
    width: 80%;
  }

  .FCFC-right {    
    width: 80%;
  }

  .FCFC-Box {
    width: 100%;
  }

  @media (max-width: 1040px) {
  .FCFC-left {
    width: 100%;
    gap: 8px;
    display: flex;
    flex-direction: column;    
  }

  .FCFC-right {    
    width: 100%;
  }

  .FCFC-Box {
    width: 100%;
  }

  .FCFC-form-resize {    
    margin: 5px auto;
    padding: 10px 0px;     
    display: flex;
    flex-direction: column;    
  }}
  
`
const defaultValue = {
  contact_title: "Mr.",
  contact_name: "",
  contact_company: "",
  contact_mobile: "",
  contact_email: "",
  contact_subject: "",
  contact_message: "",
}

const ContactForm = () => {
  const form = useRef();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  console.log('errors: ', errors)

  const sendEmail = () => {
    emailjs.sendForm(
      process.env.REACT_APP_SERVICE_ID,
      process.env.REACT_APP_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_PUBLIC_KEY
    ).then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
  };

  return (
    <FCFContainer>
      <form ref={form} onSubmit={handleSubmit(sendEmail)}>
        <div className="FCFC-form-resize">
          <div className="FCFC-left">
            <div className="FCFC-Box">
              <FormControl isRequired>
                <Flex direction="column">
                  <FormLabel
                    p="0 5px"
                    fontSize="xl"
                  >Title</FormLabel>
                  <Select fontSize="xl"
                    border='1px' borderColor='black.200'
                    boxShadow='base' rounded='md' bg='white'
                    {...register("contact_title", { required: true })}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                  </Select>
                  <FormHelperText></FormHelperText>
                </Flex>
              </FormControl>

              <FormControl isRequired>
                <Flex direction="column">
                  <FormLabel p="0 5px" fontSize="xl">Name</FormLabel>
                  <Input fontSize="xl"
                    border='1px' borderColor='black.200'
                    boxShadow='base' p='4' rounded='md' bg='white'
                    {...register("contact_name", { required: true, maxLength: 80 })}
                  />
                  <FormHelperText></FormHelperText>
                </Flex>
              </FormControl>

              <FormControl>
                <Flex direction="column">
                  <FormLabel p="0 5px" fontSize="xl">Company Name</FormLabel>
                  <Input fontSize="xl"
                    border='1px' borderColor='black.200'
                    boxShadow='base' p='4' rounded='md' bg='white'
                    {...register("contact_company", {})}
                  />
                  <FormHelperText></FormHelperText>
                </Flex>
              </FormControl>

              <FormControl>
                <Flex direction="column">
                  <FormLabel p="0 5px" fontSize="xl">H.K. Phone Number</FormLabel>
                  <Input fontSize="xl"
                    border='1px' borderColor='black.200'
                    boxShadow='base' p='4' rounded='md' bg='white'
                    type="tel"
                    {...register("contact_mobile", { min: 8, maxLength: 8 })}
                  />
                </Flex>
              </FormControl>
            </div>
          </div>

          <div className="FCFC-right">
            <div className="FCFC-box">
              <FormControl isRequired>
                <Flex direction="column">
                  <FormLabel p="0 5px" fontSize="xl">Email Address</FormLabel>
                  <Input fontSize="xl"
                    border='1px' borderColor='black.200'
                    boxShadow='base' p='4' rounded='md' bg='white'
                    {...register("contact_email", { required: true, pattern: /^\S+@\S+$/i })}
                  />
                  <FormHelperText></FormHelperText>
                </Flex>
              </FormControl>

              <FormControl isRequired>
                <Flex direction="column">
                  <FormLabel p="0 5px" fontSize="xl">Subject</FormLabel>
                  <Input fontSize="xl"
                    border='1px' borderColor='black.200'
                    boxShadow='base' p='4' rounded='md' bg='white'
                    {...register("contact_subject", { required: true })}
                  />
                  <FormHelperText></FormHelperText>
                </Flex>
              </FormControl>

              <FormControl isRequired>
                <Flex direction="column">
                  <FormLabel p="0 5px" fontSize="xl">Message</FormLabel>
                  <Textarea h='14vh' fontSize="xl"
                    border='1px' borderColor='black.200'
                    boxShadow='base' p='4' rounded='md' bg='white'
                    {...register("contact_message", { required: true })}
                  />
                  <FormHelperText></FormHelperText>
                </Flex>
              </FormControl>
            </div>
          </div>
        </div>

        <Stack align="center">
          <ButtonGroup gap='12vw'>
            <Button
              m="5px"
              w="100px"
              color="white"
              colorScheme='blackAlpha'
              onClick={() => reset(defaultValue)}>
              Reset
            </Button>
            <Button
              m="5px"
              w="100px"
              color="white"
              colorScheme='blackAlpha'
              type="submit">
              Send
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </FCFContainer >
  );
}

export default ContactForm;