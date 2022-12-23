import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const IBContainer = styled.div`

  .boxStyle {}

  .greetingStyle {
    padding: 4px;
    font-size: 1.5rem;
    overflow: hidden;
    display: flex;
    color: white;
    text-shadow: -1px 1px 1px #FFFFFF;

    @media (max-width: 800px) {
      text-shadow: 1px 1px 1px #000000;
    }
  }

  .nameStyle {
    font-size: 2.8rem;
    color: #ff8c00;
    overflow: hidden;
    display: flex;
    text-shadow: -1px 1px 1px #ff8c00;

    @media (max-width: 800px) {
      text-shadow: 1px 1px 1px #000000;
    }
  }
`

const IntroductionBox = ({ greeting, name }) => {
  const greetingWords = greeting.split(" ");
  const nameLetters = Array.from(name);
  const [ref, inView] = useInView();
  const control = useAnimation();

  const greetingStyleVariant = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.06 * i,
      },
    }),
  }

  const greetingVariant = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 70,
        stiffness: 10,
      },
    },
    hidden: {
      opacity: 0,
      x: 100,
      transition: {
        type: "spring",
        damping: 70,
        stiffness: 10,
      },
    },
  }

  const nameStyleVariant = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: (i = 0.1) => ({
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1 * i,
        duration: 2,
      },
    }),
  }

  const nameVariant = {
    visible: {
      opacity: 1, x: 0, y: 0,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 15,
        mass: 0.5,
      },
    },
    hidden: {
      opacity: 0, x: 0, y: -30,
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 10,
      },
    },
  }

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <IBContainer>
      <div className="boxStyle">
        <motion.div
          ref={ref}
          animate={control}
          initial="hidden"
          variants={greetingStyleVariant}
          className="greetingStyle"
        >
          {greetingWords.map((word, index) => (
            <motion.span
              key={index}
              variants={greetingVariant}
              style={{ marginRight: "6px" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        <div
          ref={ref}
          animate={control}
          initial="hidden"
          variants={nameStyleVariant}
          className="nameStyle"
        >
          {nameLetters.map((letter, index) => (
            <motion.span
              key={index}
              ref={ref}
              variants={nameVariant}
              animate={control}
              initial="hidden"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
      </div>
    </IBContainer>
  )
}

export default IntroductionBox;