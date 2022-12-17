import { useContext, useRef } from 'react';
import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { MdAdd } from "react-icons/md";
import { FolderContext } from '../context-manager';

const AddImageBtn = () => {
  const { setFiles } = useContext(FolderContext);

  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };
  const handleChange = (e) => {
    setFiles([...e.target.files]);
    fileRef.current.value = null;
  };
  return (
    <form>
      <Input
        type="file"
        multiple
        sx={{ display: 'none' }}
        ref={fileRef}
        onChange={handleChange}
      />
      <Box
        p={3}
        borderRadius={10}
        bgColor="purple.400"
        aria-label="add"
        onClick={handleClick}
      >
        <Flex justify="center" alignItems="center" gap={1}>
          <Text color='white' fontSize='30px'>Add Images</Text>
          <MdAdd color='white' fontSize='40px' />
        </Flex>
      </Box>
    </form>
  );
};

export default AddImageBtn;