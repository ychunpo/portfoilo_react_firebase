import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

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

const ZoneBox = styled.div`
  .zone {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
  }
`;

function DropzoneImg(props) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    //console.log(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  });

  const previewImage = files.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
      />
    </div>
  ));

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  console.log('files', files)

  return (
    <ZoneBox>
      <div
        className="zone"
        {...getRootProps({ style: { isFocused, isDragAccept, isDragReject } })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop the images here.</p>
      </div>
      {previewImage}
    </ZoneBox>
  )
}

export default DropzoneImg;