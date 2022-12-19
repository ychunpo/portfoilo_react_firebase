import React, { useCallback, useContext, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { FolderContext } from '../context-manager';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  height: 80px;
  width: 70%;
  margin: 0 auto;
  flex: 1;
  display: flex;  
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 15px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #f7f7f7;
  color: #afafaf;
  outline: none;
  transition: border .24s ease-in-out;
`;

export default function InputDropzone(props) {
  const { setFiles } = useContext(FolderContext);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({});

  const fileChange = useCallback(() => {
    setFiles([...acceptedFiles]);
  }, [setFiles, acceptedFiles]);

  useEffect(() => {
    fileChange()
  }, [acceptedFiles, fileChange])

  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <Text fontSize='xl'>
          Drag 'n' drop some files here, or click to select files
        </Text>
      </Container>
    </div>
  );
}
