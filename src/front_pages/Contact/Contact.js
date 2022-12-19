import React from 'react';
import { Heading } from '@chakra-ui/react'
import { SkipNavContent } from '@chakra-ui/skip-nav';
import styled from 'styled-components';
import ContactForm from './components/ContactForm';

const FCContainer = styled.div`
  .FC-main {
    padding-top: 40px;    
  }  
`

const Contact = () => {
  return (
    <FCContainer id="contact-id">
      <div className='FC-main'>
        <Heading
          p='5px'
          size='xl'
          align='center'
          color='white'
        >
          Email me
        </Heading>
        <SkipNavContent />
        <ContactForm />
      </div>
    </FCContainer>
  )
}

export default Contact;