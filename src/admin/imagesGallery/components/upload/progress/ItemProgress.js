
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, GridItem, Image } from '@chakra-ui/react';
import { MdCheckCircleOutline } from "react-icons/md";
import CircleProgress from './CircleProgress';
import uploadFile from '../../../firebase-tool/uploadFile';
import addDocument from '../../../firebase-tool/addDocument';
import { FolderContext } from '../../context-manager';

const ProgressItem = ({ file }) => {
  console.log('file', file)
  const { folderName } = useContext(FolderContext);
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);

  const idNum = uuidv4() + '.' + file.name.split('.').pop();

  useEffect(() => {
    const uploadImage = async () => {

      try {
        const url = await uploadFile(
          file,
          `imageLibrary/${folderName}`,
          file.name,
          setProgress
        );
        const imagesDoc = {
          imageURL: url,
          folderName: folderName,
          imageFilename: file.name,
        };
        await addDocument('imageLibrary', imagesDoc, idNum);
        setImageURL(null);
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    };
    setImageURL(URL.createObjectURL(file));
    uploadImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  return (
    imageURL && (
      <GridItem cols={1} rows={1}>
        <Image src={imageURL} alt="images library" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircleProgress value={progress} />
          ) : (
            <MdCheckCircleOutline
              sx={{ width: 60, height: 60, color: 'lightgreen' }}
            />
          )}
        </Box>
      </GridItem>
    )
  );
};

export default ProgressItem;

const backDrop = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.5)',
};