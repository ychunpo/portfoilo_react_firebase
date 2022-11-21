import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';
import {
  Box, Button, ButtonGroup,
  Flex,
  FormControl, FormLabel, FormErrorMessage, FormHelperText,
  Heading, Input,
  Select,
  Text, Textarea,
  VStack,
} from '@chakra-ui/react'
import styled from "styled-components";

const FCFContainer = styled.div`
  margin: 50px auto;
  padding: 15px;
  width: 100%;
  display: flex;
  flex-direction: column; 
  background-color: pink;
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
  //console.log('errors: ', errors)

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
      <Heading
        p='5px'
        as='h4'
        size='xl'
        align='center'
      >
        Email me
      </Heading>
      <form ref={form} onSubmit={handleSubmit(sendEmail)}>
        <VStack spacing={1}>
          <FormControl isRequired>
            <Flex direction="column">
              <FormLabel p="0 5px">Title</FormLabel>
              <Select w='30vw'
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
              <FormLabel p="0 5px">Name</FormLabel>
              <Input w='30vw'
                border='1px' borderColor='black.200'
                boxShadow='base' p='4' rounded='md' bg='white'
                {...register("contact_name", { required: true, maxLength: 80 })}
              />
              <FormHelperText></FormHelperText>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex direction="column">
              <FormLabel p="0 5px">Company Name</FormLabel>
              <Input w='30vw'
                border='1px' borderColor='black.200'
                boxShadow='base' p='4' rounded='md' bg='white'
                {...register("contact_company", {})}
              />
              <FormHelperText></FormHelperText>
            </Flex>
          </FormControl>

          <FormControl>
            <Flex direction="column">
              <FormLabel p="0 5px">H.K. Phone Number</FormLabel>
              <Input w='30vw'
                border='1px' borderColor='black.200'
                boxShadow='base' p='4' rounded='md' bg='white'
                type="tel"
                {...register("contact_mobile", { min: 8, maxLength: 8 })}
              />
            </Flex>
          </FormControl>

          <FormControl isRequired>
            <Flex direction="column">
              <FormLabel p="0 5px">Email Address</FormLabel>
              <Input w='30vw'
                border='1px' borderColor='black.200'
                boxShadow='base' p='4' rounded='md' bg='white'
                {...register("contact_email", { required: true, pattern: /^\S+@\S+$/i })}
              />
              <FormHelperText></FormHelperText>
            </Flex>
          </FormControl>

          <FormControl isRequired>
            <Flex direction="column">
              <FormLabel p="0 5px">Subject</FormLabel>
              <Input w='30vw'
                border='1px' borderColor='black.200'
                boxShadow='base' p='4' rounded='md' bg='white'
                {...register("contact_subject", { required: true })}
              />
              <FormHelperText></FormHelperText>
            </Flex>
          </FormControl>

          <FormControl isRequired>
            <Flex direction="column">
              <FormLabel p="0 5px">Message</FormLabel>
              <Textarea w='30vw'
                border='1px' borderColor='black.200'
                boxShadow='base' p='4' rounded='md' bg='white'
                {...register("contact_message", { required: true })}
              />
              <FormHelperText></FormHelperText>
            </Flex>
          </FormControl>
          <ButtonGroup gap='100px'>
            <Button
              color="white"
              colorScheme='blackAlpha'
              onClick={() => reset(defaultValue)}
            >
              Reset
            </Button>
            <Button
              color="white"
              colorScheme='blackAlpha'
              type="submit">
              Send
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </FCFContainer>
  );
}

export default ContactForm;