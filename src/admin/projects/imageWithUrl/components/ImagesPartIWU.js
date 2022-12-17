import React from 'react';
import { useFieldArray } from "react-hook-form";
import {
  Alert, AlertIcon, AlertTitle, AlertDescription, useDisclosure,
  Button, ButtonGroup, Box, Divider, FormControl, FormLabel, FormErrorMessage,
  Heading, Input, List, ListItem, ListIcon,
  Spacer, HStack, Textarea
} from '@chakra-ui/react';
import { FaPlus, FaTrash, FaArrowDown, FaArrowUp } from "react-icons/fa";

const ImagesPartIWU = ({ nestIndex, control, register, errors }) => {

  const { fields, remove, append } = useFieldArray({
    control,
    name: `items[${nestIndex}].images`
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
                  htmlFor={`items[${nestIndex}].images[${idx}].imageId`}
                >
                  Image ID - {idx}
                </FormLabel>
                <Input
                  fontSize='1.2rem'
                  bg='white'
                  {...register(`items[${nestIndex}].images[${idx}].imageId`, { required: true })}
                  defaultValue={idx}
                  type="text"
                  id="imageId"
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <FormControl pt={3}>
                <FormLabel
                  m="auto"
                  p='0 3px'
                  htmlFor={`items[${nestIndex}].images[${idx}].imageName`}
                >
                  Image Name - {idx}
                </FormLabel>
                <Input
                  fontSize='1.2rem'
                  bg='white'
                  {...register(`items[${nestIndex}].images[${idx}].imageName`, { required: true })}
                  type="text"
                  id="imageName"
                />
                <FormErrorMessage>

                </FormErrorMessage>
              </FormControl>
              <FormControl pt={3}>
                <FormLabel
                  m='auto'
                  p='0 3px'
                  htmlFor={`items[${nestIndex}].images[${idx}].imagePath`}
                >
                  Path
                </FormLabel>
                <Textarea
                  fontSize='1.2rem'
                  bg='white'
                  {...register(`items[${nestIndex}].images[${idx}].imagePath`, { required: true })}
                  type="url"
                  id="imagePath"
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
          imageID: fields.length,
          imageName: "",
          imagePath: ""
        })}>
          Add Image
        </Button>
      </Box>
      <Divider p={2} borderColor='grey' />
    </Box>
  )
}

export default ImagesPartIWU;