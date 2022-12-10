import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from 'react-toastify';
import { storage } from '../../../utils/firebase';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import { ZoneContainer } from "./sub_styled/ZoneContainer";

const ImageItemAdd = () => {
  let storagePath = [];
  const [imgFile, setImgFile] = useState([]);
  const [saveStoragePath, setSaveStoragePath] = useState({ file: [] });
  //console.log('saveStoragePath: ', saveStoragePath)
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    console.log('useEffect: ', saveStoragePath);
  }, [saveStoragePath])

  const onDrop = useCallback(acceptedFiles => {
    setImgFile(acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ))
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
  });

  const storageAndGetPath = async (file) => {
    const storageRef = ref(storage, `/images/${file.name}`);
    await uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          await storagePath.push({ name: file.name, path: url });
          await setSaveStoragePath((prev) => {
            return { ...prev, file: storagePath }
          });
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
        toast("Image added fail", { type: "error" });
      });
    setShowViewer(true);
  }

  const uploadImageSubmit = () => {
    setShowViewer(false);
    imgFile.forEach((file, i) => {
      storageAndGetPath(file);
    });
    toast("Image added successfully", { type: "success" });
  };

  const deleteImageSubmit = (filename) => {
    const storageRef = ref(storage, `/images/${filename}`);
    deleteObject(storageRef).then(() => {
      toast("Image deleted successfully", { type: "success" });
    }).catch((error => {
      console.log(error);
      toast("Image delete fail", { type: "error" });
    }))
  }

  const dataView = saveStoragePath.file.map((item, i) => {
    //console.log('item', item);
    return (
      <Box key={i}>
        <Text>Image Name: </Text>
        <Text>{item.name}</Text>
        <Text>Image Path: </Text>
        <Text>{item.path}</Text>

        <Button
          onClick={deleteImageSubmit(item.name)}
        >
          Delete
        </Button>
      </Box>
    )
  });

  return (
    <ZoneContainer>
      <div className='zone-main'
        {...getRootProps(
          { style: { isFocused, isDragAccept, isDragReject } }
        )}
        type="file"
        role="button"
      >
        <Input size='lg' {...getInputProps()} />
        <Text>Drag and drop some files here, or click to select files</Text>
        {!!imgFile?.length && (
          <Box>
            {imgFile.map((file, index) => {
              return (
                <Box key={file.name}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    id="previewImg"
                    boxSize='200px'
                    objectFit='contain'
                    fallbackSrc='https://via.placeholder.com/200'
                  />
                  <Text>Filename: {file.name}</Text>
                </Box>
              )
            })}
          </Box>
        )}
      </div>
      <Box align='right' m="15px 0">
        <Button
          colorScheme='blackAlpha'
          onClick={uploadImageSubmit}
        >
          Upload
        </Button>
      </Box>
      <Box>
        {showViewer && (
          { dataView }
        )}
      </Box>
    </ZoneContainer >
  )
}
export default ImageItemAdd;