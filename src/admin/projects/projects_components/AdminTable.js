import React from 'react';
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTable } from "react-table";
import { EditIcon, ViewIcon, ViewOffIcon, DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react'
import styled from 'styled-components';

const AdminTableContainer = styled.div`
textarea {
  text-align: left;
  width: 800px; 
  height: 800px;
}
`

const AdminTable = ({ columns, data, hiddenItem, deleteItem }) => {
  //console.log('data - ', data)
  const navigation = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "yellow",
    ...draggableStyle
  });

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    reorder(source.index, destination.index);
  }

  return (
    <AdminTableContainer>
      {data.length !== 0 && (
        <div>
          <table {...getTableProps()} border="1">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                  <th>
                    Action
                  </th>
                </tr>
              ))}
            </thead>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => {
                  return (
                    <tbody
                      {...getTableBodyProps()}
                      ref={provided.innerRef}
                    >
                      {rows.map((row, index) => {
                        //console.log('row: ', row)
                        prepareRow(row);
                        return (
                          <Draggable
                            key={row.original.id}
                            draggableId={row.original.id}
                            index={row.index}
                          >
                            {(provided, snapshot) => (

                              <tr
                                ref={provided.innerRef}
                                {...row.getRowProps()}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                snapshot={snapshot}
                                isdragging={snapshot.isdragging}
                              >
                                {row.cells.map(cell => (
                                  <td {...cell.getCellProps()}>
                                    {cell.render('Cell', {
                                      dragHandleProps: provided.dragHandleProps,
                                      isSomethingDragging: snapshot.isDraggingOver
                                    })}
                                  </td>
                                )
                                )}
                                <td>
                                  <IconButton
                                    variant='outline'
                                    aria-label='hidden project'
                                    icon={<ViewOffIcon color="green.500" />}
                                    onClick={() => hiddenItem(row.original)}
                                  />
                                  <IconButton
                                    variant='outline'
                                    colorScheme='red'
                                    aria-label='delete project'
                                    icon={<DeleteIcon />}
                                    onClick={() => deleteItem(row.original)}
                                  />
                                  <IconButton
                                    variant='outline'
                                    colorScheme='blue'
                                    aria-label='edit project'
                                    icon={<EditIcon />}
                                    onClick={() => navigation(`/admin/project/edit/${row.original.id}`)}
                                  />
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </tbody>
                  )
                }}
              </Droppable>
            </DragDropContext>
          </table>
          <br />
          <div>
            <textarea value={JSON.stringify(data.map(item => item), null, 2)} readOnly></textarea>
          </div>
        </div>
      )}
    </AdminTableContainer>
  )
}

export default AdminTable;