import React from 'react';
import { Box } from '@chakra-ui/react';
import ListProgress from './progress/ListProgress';
import InputBox from './InputBox';
import InputDropzone from './InputDropzone';

const Upload = () => {
  return (
    <Box>
      <InputDropzone />
      <InputBox />
      <ListProgress />
    </Box>
  )
}

export default Upload;