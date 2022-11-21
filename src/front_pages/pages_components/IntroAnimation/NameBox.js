import React from "react";
import styled from 'styled-components';
import { motion } from "framer-motion";
import {
  Box, Button, ButtonGroup,
  Container, Flex, Heading, HStack, Image, Input, Spacer, Text
} from '@chakra-ui/react';

const BoxStyle = styled(motion.div)`
  font-size: 2.8rem;
  color: #ff8c00;
  overflow: hidden;
  display: flex;
`

const NameBox = ({ text }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 0.1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.01 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
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