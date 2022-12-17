import React, { useContext } from 'react';
import { Grid } from '@chakra-ui/react';
import ItemProgress from './ItemProgress';
import { FolderContext } from '../../context-manager';

const ProgressList = () => {
  const { files } = useContext(FolderContext);
  console.log('files', files)

  return (
    <Grid>
      {files.map((file, index) => (
        <ItemProgress
          key={index}
          file={file}
        />
      ))}
    </Grid>
  );
};

export default ProgressList;