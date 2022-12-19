import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import styled from 'styled-components';
import {
  IconButton, Box, Table, Thead, Tbody,
  Tr, Th, Td, TableContainer, Textarea
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const AdminTableContainer = styled.div`
  margin: 5px 15px;
  padding: 5px;  

  textarea {
    text-align: left;
    width: 800px; 
    height: 800px;
  }
`

const AdminTable = ({ columns, data, deleteItem }) => {
  const navigation = useNavigate();
  const {
    getTableProps, getTableBodyProps,
    headerGroups, rows, prepareRow
  } = useTable({ columns, data });

  return (
    <AdminTableContainer>
      {data.length !== 0 && (
        <div>
          <TableContainer maxWidth='100%' overflowX overflowY>
            <Table
              size="sm"
              {...getTableProps()}
            >
              <Thead>
                {headerGroups.map(headerGroup => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <Th color='green.600'
                        {...column.getHeaderProps()}
                      >
                        {column.render('Header')}
                      </Th>
                    ))}
                    <Th color='green.600'>
                      Action
                    </Th>
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <Tr
                      {...row.getRowProps()}
                      key={row.original.id}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <Td
                            {...cell.getCellProps()}
                          >
                            {cell.render('Cell')}
                          </Td>
                        )
                      })}
                      <Td>
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
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <br />
          <Box>
            <Textarea
              bg='white'
              size='md'
              variant='outline'
              value={JSON.stringify(data.map(item => item), null, 2)}
              isReadOnly
            />
          </Box>
        </div>
      )}
    </AdminTableContainer>
  )
}

export default AdminTable;