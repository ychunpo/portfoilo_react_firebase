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
  console.log('saveStoragePath: ', saveStoragePath)

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
    //accept: accept,    
  });

  const storageAndGetPath = async (file) => {
    const storageRef = ref(storage, `/images/${file.name}`);
    await uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef).then((url) => {
          storagePath.push({ name: file.name, path: url });
          setSaveStoragePath((prev) => {
            return { ...prev, file: storagePath }
          });
        }).catch(error => {
          console.log(error);
        })
      }).catch(error => {
        console.log(error);
        toast("Image added fail", { type: "error" });
      })
  }

  const uploadImageSubmit = () => {
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
      <div key={i}>
        <Box>Image Name: </Box>
        <Box>{item.name}</Box>
        <Box>Image Path: </Box>
        <Box>{item.path}</Box>
        <Button onClick={deleteImageSubmit(item.name)}>Delete</Button>
      </div>
    )
  });

  return (
    <ZoneContainer>
      <Box className='zone-main'
        {...getRootProps(
          { style: { isFocused, isDragAccept, isDragReject } }
        )}
        type="file"
        role="button"
      >
        <Input size='lg' {...getInputProps()} />
        <Text>Drag and drop some files here, or click to select files</Text>
        {!!imgFile?.length && (
          <div>
            {imgFile.map((file, index) => {
              return (
                <div key={file.name}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    id="previewImg"
                    boxSize='200px'
                    objectFit='contain'
                    fallbackSrc='https://via.placeholder.com/200'
                  />
                  <div>Filename: {file.name}</div>
                </div>
              )
            })}
          </div>
        )}
      </Box>
      <Box align='right' m="10px 0">
        <Button
          colorScheme='blackAlpha'
          onClick={uploadImageSubmit}
        >
          Upload
        </Button>
      </Box>
      <Box>
        {dataView}
      </Box >

    </ZoneContainer >
  )
}
export default ImageItemAdd;