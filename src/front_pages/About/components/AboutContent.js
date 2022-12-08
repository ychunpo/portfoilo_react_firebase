import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import styled from 'styled-components';
import { Box, Heading, Text, HStack, Stack } from '@chakra-ui/react';

const AboutContentContainer = styled.div`
  font-family: 'Source Sans Pro', sans-serif;
  width: 99%;
  padding: 0 auto;
  display: flex;
  justify-content: center;
  
  @media (min-width: 800px) {   
  }
`

const AboutContent = () => {
  return (
    <AboutContentContainer>
      <Box>
        <Heading
          color='white'
          as='h4'
          m="10px 0"
          size={{ base: 'md', lg: 'xl', md: 'xl', sm: 'lg', xs: 'lg' }}
        >
          About Me
        </Heading>
        <Stack p="5px 0" color="white" fontSize='2xl'>

          <Text as='b' fontSize={{ base: '75%', lg: '100%', md: '95%', sm: '90%', xs: '85%' }}>
            I like to learn all about design and computers.
          </Text>
          <HStack align='baseline'>
            <Text
              as='b'
              fontSize={{ base: '75%', lg: '100%', md: '95%', sm: '90%', xs: '85%' }}>
              I am greatly interested in </Text>
            <Text
              as='b'
              fontSize={{ base: '75%', lg: '100%', md: '95%', sm: '90%', xs: '85%' }}
              color='#ffff66'>
              <TypeAnimation
                sequence={[
                  'Graphics Design.', 1000,
                  '3D Production.', 1000,
                  'Game Production.', 1000,
                  'Video Production.', 1000,
                  'Mobile Apps.', 1000,
                  'Front-End.', 1000,
                  'Back-End.', 1000,
                  'Blockchain.', 1000,
                  'Data Analysis.', 1000,
                ]}
                speed={50}
                style={{}}
                wrapper="span"
                repeat={Infinity}
              />
            </Text>
          </HStack>
          <Text
            as='b'
            fontSize={{
              base: '75%', lg: '100%', md: '95%', sm: '90%', xs: '85%'
            }}>
            All the above knowledge and techniques are also in self-study.
          </Text>
        </Stack>
      </Box>
    </AboutContentContainer>
  )
}

export default AboutContent;