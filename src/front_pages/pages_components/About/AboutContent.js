import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Box,
  Heading,
  List,
  ListItem,
  UnorderedList,
  Text
} from '@chakra-ui/react';
import { myInterestList } from '../../../data/myInterestList';

const AboutContentContainer = styled.div`
  font-family: 'Source Sans Pro', sans-serif;  
`

const AboutContent = () => {

  return (
    <AboutContentContainer>
      <Heading as='h4' size='xl' color="white" m="10px 0">About Me</Heading>
      <Box p="5px 0" color="white" fontSize='2xl'>
        <Text>I like to learn all about design and computers.</Text>
        <Text>My Self-study has: </Text>
        <List>
          <UnorderedList color="orange" p="5px">
            {myInterestList.map((item, i) => {
              return (<ListItem key={i}><Text as="b">{item}</Text></ListItem>)
            })}
          </UnorderedList>
        </List>
        <Text>I have great interest in all of the above.</Text>
      </Box>
    </AboutContentContainer>
  )
}

export default AboutContent;