import React from 'react';
import { useFieldArray } from "react-hook-form";
import {
  Button, Box, Flex, FormControl, FormLabel, FormErrorMessage,
  Input, List, ListItem,
} from '@chakra-ui/react';
import ImagesPartIWU from './ImagesPartIWU';

const ItemsPartIWU = ({ control, register, setValue, getValues, errors }) => {
  const {
    fields, append, remove,
  } = useFieldArray({
    control,
    name: "items",
  });

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
                    >
                      Item ID - {index}
                    </FormLabel>
                    <Input
                      fontSize='1.2rem'
                      bg='white'
                      {...register(`items[${index}].itemId`)}
                      placeholder={index}
                      type="number"
                    />
                    <FormErrorMessage>

                    </FormErrorMessage>
                  </FormControl>
                  <FormControl pt={3}>
                    <FormLabel
                      m="auto"
                      p='0 3px'
                    >
                      Item Caption - {index}
                    </FormLabel>
                    <Input
                      fontSize='1.2rem'
                      bg='white'
                      {...register(`items[${index}].itemCaption`)}
                      type="text"
                    />
                    <FormErrorMessage>

                    </FormErrorMessage>
                  </FormControl>
                  <FormControl pt={3}>
                    <FormLabel
                      m="auto"
                      p='0 3px'
                    >
                      Item Text- {index}
                    </FormLabel>
                    <Input
                      fontSize='1.2rem'
                      bg='white'
                      {...register(`items[${index}].itemText`)}
                      type="text"
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