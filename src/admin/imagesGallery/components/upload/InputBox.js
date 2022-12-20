import React, { useContext, useMemo, useState } from 'react';
import { Box, Button, Input, InputGroup } from '@chakra-ui/react';
import { FolderContext } from '../context-manager';

const InputBox = () => {
  const { setFolderName } = useContext(FolderContext);
  const [word, setWord] = useState('test');

  const handleClear = () => {
    setWord('');
    setFolderName('');
  }

  const InputFolderName = useMemo(() => (
    <Input
      name='folderName'
      placeholder='Input Folder Name'
      onChange={(e) => setWord(e.target.value)}
      value={word} />
  ), [word, setWord]);

  return (
    <Box w='500px' p={5} display='flex' m='0 auto'>
      <InputGroup>

        <Button
          w='110px'
          color='white'
          bgColor='green.400'
          onClick={handleClear}>
          Clear
        </Button>
        {InputFolderName}
        <Button
          w='110px'
          bgColor='blue.300'
          color='white'
          onClick={() => setFolderName(word)}>
          Confirm
        </Button>
      </InputGroup>
    </Box>
  )
}

export default InputBox;