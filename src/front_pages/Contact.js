import React from 'react';
import styled from 'styled-components';
import { Text } from '@chakra-ui/react';
import ContactForm from './pages_components/ContactForm';

const FCContainer = styled.div`
background-color: purple;
height: 100vh;



div {
  display: flex;
  flex: 1;
  justify-content: space-around
}
.contact-form-left {  
  align-items: center;
}

.contact-form-right {  
  align-items: center;
  
}
`

const Contact = () => {
  return (
    <FCContainer>
      <div className="contact-form-left">
        <div>
          <Text>left Area</Text>
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