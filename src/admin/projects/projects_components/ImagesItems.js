import React, { useState } from 'react';
import { useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FileInput from "./FileInput";

const ImagesItems = ({ control, watch }) => {
  const { fields, append, prepend, remove, move } = useFieldArray({
    control,
    name: "items",
  });

  console.log('Watch: ', watch());
  //console.log('fields: ', fields);

  const onDragEnd = (result) => {
    move(result.source.index, result.destination.index);
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((item, index) => {
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
                        <div>
                          <FileInput
                            name={name}
                            label={label}
                            number="5"
                          />
                          <button type="button" onClick={() => remove(index)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <section>
        <button
          type="button"
          onClick={() =>
            append()
          }
        >
          Add Item
        </button>
      </section>
    </div>
  )
}

export default ImagesItems;
