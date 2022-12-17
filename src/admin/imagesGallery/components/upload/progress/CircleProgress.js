import React from 'react';
import { Box, CircularProgress, Text } from '@chakra-ui/react';

const CircleProgress = ({ value }) => {
  return (
    <Box>
      <CircularProgress
        size={60}
        thickness={5}
        value={value}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          color="white"
          fontSize="1rem"
        >
          {Math.round(value) + '%'}
        </Text>
      </Box>
    </Box>
  );
};

export default CircleProgress;