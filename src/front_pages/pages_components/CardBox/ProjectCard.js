import React from 'react';
import { Box, Image, VStack } from '@chakra-ui/react';

const ProjectCard = ({ data }) => {
  return (
    <Box m="20px 20px 10px 20px" overflow="hidden">
      <Image
        m="auto" boxSize='300px'
        src={data.coverImagePath}
        alt={data.coverImageFilename}
      />
      <VStack pt="5px" align="left">
        <Box p="5px">{data.title}</Box>
        <Box p="0px 5px">{data.use}</Box>
        <Box p="5px" noOfLines={1}>{data.description}</Box>
      </VStack>
    </Box>
  )
}

export default ProjectCard;
