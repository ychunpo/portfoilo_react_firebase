import React, { useState } from 'react';
import { useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ref, getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { storage, db, auth } from '../../../utils/firebase';
import FileInput from "./FileInput";

const ImagesItems = ({ control, watch }) => {
  const [progress, setProgress] = useState('');

  const { fields, append, prepend, remove, move } = useFieldArray({
    control,
    name: "items",
  });

  //console.log('Watch: ', watch());
  //console.log('fields: ', fields);

  //const uploadImgRef = ref(storage, `/images/${img.name}`)
  // const imageStoreRef = ref(storage, `/images/items`)

  // const uploadImage = uploadBytesResumable(imageStoreRef, img);

  const onDragEnd = (result) => {
    move(result.source.index, result.destination.index);
  }

  const uploadItemsImage = () => {
    // uploadImage.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progressPercent = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     setProgress(progressPercent);
    //   },
    //   (error) => {
    //     console.log("Error Image Upload:", error);
    //   }
    // )
  }

  const deleteItemsImage = () => {

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
                            uploadImage={uploadItemsImage}
                            deleteImage={deleteItemsImage}
                          />
                        </div>
                        <div>
                          <button type="button" onClick={() => remove(index)}>
                            Delete Item
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
