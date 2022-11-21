import React from 'react';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react';
import ContactForm from './pages_components/ContactForm';

const FCContainer = styled.div`
  background-color: purple; 
  weight: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  
  .contact-form-left {    

  }

  .contact-form-right {
  
  }
`

const Contact = () => {
  return (
    <FCContainer id="contactId">
      <div className="contact-form-left">
        <div>
          <Box>Left Area</Box>
        </div>
      </div>
      <div className="contact-form-right">
        <div>
          <ContactForm />
        </div>
      </div>
    </FCContainer>
  )
}

export default Contact;