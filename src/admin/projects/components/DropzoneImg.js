import React, { useEffect, useCallback, useState } from 'react';
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
  const { addImages } = props;
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ));
  }, []);

  useEffect(() => {
    addImages(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  //console.log('onDrop', onDrop);
  // console.log('files', files);
  // console.log('addImages', addImages);

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

  return (
    <ZoneBox>
      <div
        className="zone"
        {...getRootProps({ style: { isFocused, isDragAccept, isDragReject } })}
      >
        <input {...getInputProps()} />
        <p>Drag and drop the images here.</p>
      </div>
    </ZoneBox>
  )
}

export default DropzoneImg;