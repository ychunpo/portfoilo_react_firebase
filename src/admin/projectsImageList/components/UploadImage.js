import React from 'react';
import ImageUploading from "react-images-uploading";
import { Box, Button, Flex, Image, VStack } from '@chakra-ui/react';
const UploadImage = () => {

  const [images, setImages] = React.useState([]);

  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Box>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png", "gif"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <Box>
            <Box
              p='20px 140px'
              bg='purple.300'
              borderRadius={15}
              sx={isDragging ? { color: "red" } : null}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </Box>
            <Box p='20px 0'>
              <Button onClick={onImageRemoveAll}>Remove all images</Button>
            </Box>
            {imageList.map((image, index) => (
              <Flex
                key={index}
                align='center'
                justify='center'
                gap={5}
              >
                <Image src={image.data_url} w="200px" />
                <VStack gap={2}>
                  <Button
                    onClick={() => onImageUpdate(index)}>
                    Update
                  </Button>
                  <Button
                    onClick={() => onImageRemove(index)}>
                    Remove
                  </Button>
                </VStack>
              </Flex>
            ))}
          </Box>
        )}
      </ImageUploading>
    </Box>
  )
}

export default UploadImage;