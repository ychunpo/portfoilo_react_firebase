import React from "react";
import styled from 'styled-components';
import { motion } from "framer-motion";

const BoxStyle = styled(motion.div)`
  font-size: 2.8rem;
  color: #ff8c00;
  overflow: hidden;
  display: flex;
    text-shadow: -1px 1px 1px #ff8c00;

  @media (max-width: 800px) {
    text-shadow: 1px 1px 1px #000000;
  }
`

const NameBox = ({ text }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 0.1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 15,
      },
    },
    hidden: {
      opacity: 0, x: 20, y: 0,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 10,
      },
    },
  };

  return (
    <BoxStyle
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </BoxStyle>
  );
};

export default NameBox;