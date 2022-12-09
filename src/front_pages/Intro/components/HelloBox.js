import React from "react";
import styled from 'styled-components';
import { motion } from "framer-motion";

const HelloStyle = styled(motion.div)`  
  font-size: 1.5rem;
  overflow: hidden;
  display: flex;
  color: white;
  text-shadow: -1px 1px 1px #FFFFFF;

  @media (max-width: 800px) {
    text-shadow: 1px 1px 1px #000000;
  }
`

const HelloBox = ({ text }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 90,
        stiffness: 10,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 90,
        stiffness: 10,
      },
    },
  };

  return (
    <HelloStyle
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "5px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </HelloStyle>
  );
};

export default HelloBox;