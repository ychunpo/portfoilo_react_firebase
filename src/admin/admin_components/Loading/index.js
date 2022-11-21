import React from 'react';
import { Center, SkeletonCircle, Spinner, Text } from '@chakra-ui/react';
import styled from 'styled-components';

const ALContainer = styled.div`
  width: 100%;
  height: 100% 
`

const AdminLoading = () => {
  return (
    <ALContainer>
      <Center w='100%' mt='25%'>
        <Spinner
          thickness='2px'
          speed='1.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='md'
        />
        <Text fontSize='3xl' color='blackAlpha.400'>Loading</Text>
        <Text as='sub'>
          <Text as='sub'>
            <Text as='sub'>
              <Text as='sub'>
                <SkeletonCircle size='1.5' />
              </Text>
            </Text>
          </Text>
        </Text>
        <Text as='sub'>
          <Text as='sub'>
            <Text as='sub'>
              <Text as='sub'>
                <SkeletonCircle size='1.5' />
              </Text>
            </Text>
          </Text>
        </Text>
        <Text as='sub'>
          <Text as='sub'>
            <Text as='sub'>
              <Text as='sub'>
                <SkeletonCircle size='1.5' />
              </Text>
            </Text>
          </Text>
        </Text>
      </Center>
    </ALContainer>
  )
}

export default AdminLoading