import React from 'react';
import {
  Box,
  Card, CardHeader, CardBody, CardFooter,
  Heading, Image,
  Text, VStack
} from '@chakra-ui/react';

const ProjectCard = ({ data }) => {
  return (
    <Card
      overflow="hidden"
      variant="outline"
    >
      <CardHeader m='-1px'>
        <Heading size='md' align="center">
          {data.title}
        </Heading>
      </CardHeader>

      <CardBody p='0 30px'>
        <Image
          m="auto" boxSize='300px'
          src={data.coverImagePath}
          alt={data.coverImageFilename}
          fallbackSrc='https://via.placeholder.com/300'
        />
        <VStack p="10px 0" align="left">
          <Box p="0 5px">
            {data.use}
          </Box>
          <Text p="0 5px" noOfLines={1}>
            {data.description}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default ProjectCard;
