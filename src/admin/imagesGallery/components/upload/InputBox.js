import React, { useContext, useMemo, useState } from 'react';
import { Box, Input, InputLeftAddon, InputRightAddon, InputGroup } from '@chakra-ui/react';
import { FolderContext } from '../context-manager';

const InputBox = () => {
  const { setFolderName } = useContext(FolderContext);
  const [word, setWord] = useState('test');

  const handleClear = () => {
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
        <InputLeftAddon
          color='blue.600'
          children='Confirm'
          onClick={() => setFolderName(word)}
        />
        {InputFolderName}
        <InputRightAddon
          bgColor='blue.300'
          color='white'
          children='Clear'
          onClick={handleClear}
        />
      </InputGroup>
    </Box>
  )
}

export default InputBox;