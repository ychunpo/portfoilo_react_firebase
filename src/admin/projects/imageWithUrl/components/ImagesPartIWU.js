import React from 'react';
import { useFieldArray } from "react-hook-form";
import {
  Button, Box, Divider, FormControl, FormLabel, FormErrorMessage,
  Input, List, ListItem, Textarea
} from '@chakra-ui/react';

const ImagesPartIWU = ({ nestIndex, control, register, errors }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `items[${nestIndex}].itemImages`
  });

  return (
    <Box>
      <List>
        {fields.map((image, idx) => {
          return (
            <ListItem key={image.id} p='0 20px'>
              <Divider p={2} borderColor='grey' w='98%' />
              <FormControl pt={3}>
                <FormLabel
                  m="auto"
                  p='0 3px'
                  htmlFor={`items[{nestIndex}].itemImages[${idx}].itemImageId`}
                >
                  Image ID - {idx}
                </FormLabel>
                <Input
                  fontSize='1.2rem'
                  bg='white'
                  {...register(`items[${nestIndex}].itemImages[${idx}].itemImageId`)}
                  placeholder={idx}
                  type="number"
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <FormControl pt={3}>
                <FormLabel
                  m="auto"
                  p='0 3px'
                  htmlFor={`items[${nestIndex}].itemImages[${idx}].itemImageFilename`}
                >
                  Image Name
                </FormLabel>
                <Input
                  fontSize='1.2rem'
                  bg='white'
                  {...register(`items[${nestIndex}].itemImages[${idx}].itemImageFilename`)}
                  type="text"
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <FormControl pt={3}>
                <FormLabel
                  m='auto'
                  p='0 3px'
                  htmlFor={`items[${nestIndex}].itemImages[${idx}].itemImagePath`}
                >
                  Path
                </FormLabel>
                <Textarea
                  fontSize='1.2rem'
                  bg='white'
                  {...register(`items[${nestIndex}].itemImages[${idx}].itemImagePath`)}
                  type="url"
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <Box align='center' pt={4}>
                <Button onClick={() => remove(idx)}>
                  Delete Image
                </Button>
              </Box>
            </ListItem>
          )
        })}
      </List>
      <Box p={2} align='end'>
        <Button onClick={() => append({
          itemImageId: fields.length,
          itemImageFilename: "",
          itemImagePath: ""
        })}>
          Add Image
        </Button>
      </Box>
      <Divider p={2} borderColor='grey' />
    </Box>
  )
}

export default ImagesPartIWU;