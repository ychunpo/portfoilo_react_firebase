import React from 'react';
import { Center, Skeleton, SkeletonCircle, SkeletonText, Spinner, Text } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Center w='400px'>
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
  )
}

export default Loading