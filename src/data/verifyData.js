import React from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toastFeature = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

const verifyData = (type, text) => {
  switch (type) {

  }
}

export const toastOrder = (type, text) => {
  toast.error('Please fill all the fields', {
    toastFeature
  });
}


export default verifyData;
