import React from 'react';
import { useFieldArray } from "react-hook-form";
import {
  Button, Box, Divider, Flex, FormControl, FormLabel, FormErrorMessage,
  Input, List, ListItem, ListIcon, Spacer, Textarea
} from '@chakra-ui/react';
import ImagesPartIWU from './ImagesPartIWU';


const ItemsPartIWU = ({ control, register, setValue, getValues, errors }) => {
  const {
    fields, append, prepend, remove, swap, move, insert, replace
  } = useFieldArray({
    control,
    name: "items",
  });

  const onDragEnd = (result) => {
    move(result.source.index, result.destination.index);
  }

  const deleteItem = (index) => {
    remove(index);
  }

  return (
    <Box>
      <List>
        {fields.map((item, index) => {
          return (
            <ListItem key={item.id}>
              <Flex alignItems="center" gap='8px'>
                <Box w='90%'>
                  <FormControl>
                    <FormLabel
                      m="auto"
                      p='0 3px'
                      htmlFor={`items[${index}].itemId`}
                    >
                      Item ID - {index}
                    </FormLabel>
                    <Input
                      fontSize='1.2rem'
                      bg='white'
                      {...register(`items[${index}].itemId`, { required: true })}
                      defaultValue={index}
                      type="text"
                      id="itemId"
                    />
                    <FormErrorMessage>

                    </FormErrorMessage>
                  </FormControl>
                  <FormControl pt={3}>
                    <FormLabel
                      m="auto"
                      p='0 3px'
                      htmlFor={`items[${index}].caption`}
                    >
                      Item Caption - {index}
                    </FormLabel>
                    <Input
                      fontSize='1.2rem'
                      bg='white'
                      {...register(`items[${index}].caption`, { required: true })}
                      type="text"
                      id="caption"
                    />
                    <FormErrorMessage>

                    </FormErrorMessage>
                  </FormControl>
                  <FormControl pt={3}>
                    <FormLabel
                      m="auto"
                      p='0 3px'
                      htmlFor={`items[${index}].text`}
                    >
                      Item Text- {index}
                    </FormLabel>
                    <Input
                      fontSize='1.2rem'
                      bg='white'
                      {...register(`items[${index}].text`, { required: true })}
                      type="text"
                      id="text"
                    />
                    <FormErrorMessage>

                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Button
                  m='auto'
                  colorScheme='red'
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </Flex>
              <ImagesPartIWU nestIndex={index} {...{ control, register, errors }} />
            </ListItem>
          )
        })}
      </List>

      <Box pt={4} align='center'>
        <Button
          colorScheme='cyan'
          onClick={() => append()}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  )
}

export default ItemsPartIWU;