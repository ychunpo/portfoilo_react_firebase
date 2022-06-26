import React from "react";
import styled from "styled-components";


const ContactBox = styled.div`


input, textarea {
  margin: 10px;
  padding: 5Px;
  
}

.form-style {
  input, textarea, button {
    font-size: 1.5rem;
  }
  
}

.inbox-style {
  display: flex;
  flex-direction: column;
  width: 500px;
}

.btn-style {
  margin: 10px;
  padding: 5px;
}
`

const ContactForm = () => {
  return (
    <ContactBox>
      <form
        className="form-style"
        method="post"
        action="">
        <div className="inbox-style">
          <h1 className="">Contact Me</h1>
          <p className=""></p>
          <input type="text" placeholder="Enter Your Name" name="name" />
          <input type="email" placeholder="Enter Your Email" name="email" />
          <input type="text" placeholder="Enter Your Subject" name="subject" />
          <textarea placeholder="Enter Your Message" name="message" rows="10" />
        </div>
        <button className="btn-style">Send</button>
      </form>
    </ContactBox>
  )
}

export default ContactForm;