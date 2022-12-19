import React from 'react';
import {
  AspectRatio, Button, Card, CardBody, CardFooter,
  Divider, Heading, Image, Text, VStack
} from '@chakra-ui/react';

const ProjectCard = ({ data, onOpen, setSingleData }) => {
  return (
    <Card overflow="hidden" variant="outline" justify='center'>
      <CardBody p='1px' bgColor='rgba(200,200,200,0.1)' >
        <AspectRatio maxW='100%' ratio={1}>
          <Image
            m="auto"
            borderRadius="10px"
            src={data.coverImagePath}
            alt={data.coverImageFilename}
            fallbackSrc={{
              base: 'https://via.placeholder.com/206',
              sm: 'https://via.placeholder.com/266',
              xs: 'https://via.placeholder.com/316'
            }}
          />
        </AspectRatio>
        <VStack p="10px" align="left" spacing={3}>
          <Heading size='lg' align='center' color='blue.500' noOfLines={1}>
            {data.title}
          </Heading>
          <Text size='md' p="0 5px" noOfLines={2}>
            {data.description}
          </Text>
        </VStack>
      </CardBody>
      <Divider
        sx={{
          borderWidth: '1px',
          borderStyle: "solid",
          borderRadius: 10,
          borderColor: "blue.200",
        }}
      />
      <CardFooter justify="center">
        <Button
          zIndex={6}
          w="200px"
          color='white'
          bgColor='blue.400'
          opacity={0.8}
          onClick={() => {
            onOpen();
            setSingleData(data);
          }}>
          View More
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard;