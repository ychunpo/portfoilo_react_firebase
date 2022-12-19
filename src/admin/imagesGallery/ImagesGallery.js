import React, { useState } from 'react'
import { Box, Heading, } from '@chakra-ui/react';
import Upload from './components/upload/Upload'
import ImagesList from './components/imagesList/ImagesList'
import { FolderContext } from './components/context-manager';

const MainApp = () => {
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState('');

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Heading p={3} color='purple.400'>Image List</Heading>
      <FolderContext.Provider value={{ files, setFiles, folderName, setFolderName }}>
        <Upload />
        <ImagesList />
      </FolderContext.Provider>
    </Box>
  )
}

export default MainApp;