import React from 'react';
import styled from 'styled-components';
import ContactForm from './pages_components/ContactForm';

const ContactBox = styled.div`
background-color: yellow;
height: 80vh;
display: flex;
justify-content: space-between;

div {
  display: flex;
  flex: 1;
  justify-content: center;
}
.contact-form-left {  
  
}

.contact-form-right {  
  align-item: center;
  
}
`

const Contact = () => {
  return (
    <ContactBox>
      <div className="contact-form-left">
        <ContactForm />
      </div>
      <div className="contact-form-right">
        <div>
          Right Area
        </div>
      </div>
    </ContactBox>
  )
}

export default Contact;