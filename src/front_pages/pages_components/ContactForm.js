import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import emailjs from 'emailjs-com';
import styled from "styled-components";
import { Button, Box, CssBaseline, TextField, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';



const ContactForm = () => {
  const form = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log('errors: ', errors)
  const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      <form ref={form} onSubmit={handleSubmit(sendEmail)}>

        <label htmlFor="contact_name">Name</label>
        <input
          type="text"
          placeholder="Name"
          {...register("contact_name", { required: true, maxLength: 80 })}
        />

        <label htmlFor="contact_title">Title</label>
        <select {...register("contact_title", { required: true })}>
          <option value="Mr.">Mr</option>
          <option value="Mrs.">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr.">Dr</option>
        </select>

        <label htmlFor="contact_company">Company Name</label>
        <input type="text" placeholder="Company Name" {...register("contact_company", {})} />


        <label htmlFor="contact_name">Mobile</label>
        <input type="tel" placeholder="Mobile number" {...register("contact_mobile", { min: 8, maxLength: 8 })} />

        <label htmlFor="contact_company">Email Address</label>
        <input
          type="text"
          placeholder="Email Address"
          {...register("contact_email", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <label htmlFor="contact_company">Subject</label>
        <input
          type="text"
          placeholder="Subject"
          {...register("contact_subject", { required: true })}
        />

        <label htmlFor="contact_company">Message</label>
        <textarea {...register("contact_message", { required: true })} />

        <input type="submit" value="Submit" />
      </form>
    </ThemeProvider>
  );
}

export default ContactForm;