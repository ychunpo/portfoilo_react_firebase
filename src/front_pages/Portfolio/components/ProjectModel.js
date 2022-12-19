import React from 'react';
import {
  AspectRatio, Box, Button, Divider, Heading,
  ModalContent, ModalHeader, ModalBody, ModalFooter,
  ModalOverlay, ModalCloseButton, Link,
  Stack, HStack, Tag, TagLabel, Text,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import ItemImagesSwiper from './ItemImagesSwiper';

const ProjectModel = ({ singleData, onClose, setSingleData }) => {
  const {
    title, use, description, websiteUrl, gitUrl, uiuxUrl, videoUrl, items
  } = singleData;

  const words = use.split(" ");
  const youtubeLoading = () => {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ModalOverlay
        bg='none'
        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='1px'
      />
      <ModalContent>
        <ModalHeader color='#07789e' boxShadow='base'>
          <Heading size='xl' align='center'>{title}</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {videoUrl && (
            <Box align='center'>
              <AspectRatio maxW='500px' ratio={4 / 3}>
                <iframe
                  onLoad={youtubeLoading}
                  title={title}
                  src={videoUrl}
                  allowFullScreen
                  loading="lazy"
                />
              </AspectRatio>
            </Box>
          )}
          <Box>
            <Stack
              m="10px auto"
              p={{ base: '0 3%', lg: '0 14%', md: '0 12%', sm: '0 10%', xs: '0 8%' }}>
              <Text
                fontSize={{ base: 'sm', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                as='b'
                color='blue.600'
              >
                Used Mainly by
              </Text>
              <HStack spacing={2}>
                {
                  words.map((word, index) => {
                    return (
                      <Tag key={index} variant='solid' bgColor='#f4669a'>
                        <TagLabel
                          fontSize={{ base: 'md', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                        >
                          {word}
                        </TagLabel>
                      </Tag>
                    )
                  })
                }
              </HStack>
              <Divider m='10px auto' p='1px' bgColor='gray.300' />
              <Text
                fontSize={{ base: 'sm', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                as='b'
                color='blue.600'
              >
                Description
              </Text>
              <Text
                fontSize={{ base: 'md', lg: '2xl', md: 'xl', sm: 'xl', xs: 'lg' }}
              >
                {description}
              </Text>
              <Divider m='10px auto' p='1px' bgColor='gray.300' />
              <HStack spacing={10}>
                {websiteUrl && (
                  <>
                    <Link href={websiteUrl} isExternal>
                      <HStack alignContent="center">
                        <Text
                          fontSize={{ base: 'sm', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                          as='b'
                          color='blue.600'
                        >
                          Webpage
                        </Text>
                        <LinkIcon mx='1px' />
                      </HStack>
                    </Link>
                  </>
                )}
                {gitUrl && (
                  <>
                    <Link href={gitUrl} isExternal>
                      <HStack alignContent="center">
                        <Text
                          fontSize={{ base: 'sm', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                          as='b'
                          color='blue.600'
                        >
                          Code
                        </Text>
                        <LinkIcon mx='1px' />
                      </HStack>
                    </Link>
                  </>
                )}
                {uiuxUrl && (
                  <>
                    <Link href={uiuxUrl} isExternal>
                      <HStack alignContent="center">
                        <Text
                          fontSize={{ base: 'sm', lg: 'xl', md: 'lg', sm: 'lg', xs: 'md' }}
                          as='b'
                          color='blue.600'
                        >
                          UI/UX
                        </Text>
                        <LinkIcon mx='1px' />
                      </HStack>
                    </Link>
                  </>
                )}
              </HStack>
              <Divider m='10px auto' p='1px' bgColor='gray.300' />
            </Stack>
            <ItemImagesSwiper items={items} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            fontSize='xl'
            colorScheme='blackAlpha'
            onClick={() => {
              onClose();
              setSingleData({});
            }}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default ProjectModel;