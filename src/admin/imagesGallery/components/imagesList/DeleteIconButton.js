import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import delDocument from '../../firebase-tool/delDocument';
import delFile from '../../firebase-tool/delFile';
import { FolderContext } from '../context-manager';

export default function DeleteIconButton({ imageId }) {
  const { folderName } = useContext(FolderContext);

  const handleDelete = async () => {
    try {
      await delDocument('imageLibrary', imageId);
      await delFile(`imageLibrary/${folderName}/${imageId}`);
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Tooltip label="Delete">
        <IconButton
          sx={{
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            display: 'flex',
            position: 'absolute',
            color: 'white',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 1,
          }}
          icon={<MdDelete fontSize="25px" />}
          onClick={handleDelete}
        />
      </Tooltip>
    </React.Fragment >
  );
}