import React from 'react';
import { useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button, Box,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import FileInput from "./FileInput";

const ImagesItems = ({ control, watch }) => {
  const { fields, append, remove, move } = useFieldArray({
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
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((item, index) => {
                //console.log('I am fields: ', fields)
                const name = `items.${index}.image`;
                const label = `items.${index}`;
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Flex alignItems="center" gap='8px'>
                          <Box w='90%'>
                            <FileInput
                              name={name}
                              label={label}
                              max="5"
                            />
                          </Box>
                          <Button
                            m='auto'
                            colorScheme='red'
                            onClick={() => deleteItem(index)}
                          >
                            Delete
                          </Button>
                        </Flex>
                        <br />
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Box>
        <Button
          colorScheme='cyan'
          onClick={() => append()}
        >
          Add Item
        </Button>
      </Box>
    </div>
  )
}

export default ImagesItems;
