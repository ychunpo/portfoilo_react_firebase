import React, { useCallback, useState, useRef } from 'react';
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
`

const Dropzone = (props) => {
  const { getImagesData } = props;
  const [selectedImages, setSelectedImages] = useState([])
  const [imagesText, setImagesText] = useState('');
  const captionRef = useRef(null)

  const onDrop = useCallback(acceptedFiles => {
    setSelectedImages(acceptedFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ))
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  const selected_images = selectedImages?.map(file => (
    <div key={file.name}>
      <img
        src={file.preview}
        style={{ width: "200px" }}
        alt=""
      />
    </div>
  ));

  const addText = () => {
    let text = imagesText;
    let data = [];
    data.push(selectedImages);
    data.push({ 'text': text });
    return data;
  }

  const sendData = (e) => {
    e.preventDefault();
    getImagesData(addText());
  }

  const handleChange = (e) => {
    setImagesText(e.target.value);
  }

  return (
    <ZoneBox>
      <div className='zone'
        {...getRootProps(
          { style: { isFocused, isDragAccept, isDragReject } }
        )}
      >
        <input {...getInputProps()} />
        <p>Drop the images here ...</p>
      </div>
      <input
        className=''
        ref={captionRef}
        type='text'
        name='imagesText'
        placeholder='Enter a caption'
        value={imagesText || ''}
        onChange={(e) => handleChange(e)}

      />
      <button
        className=''
        onClick={(e) => sendData(e)}>
        Post
      </button>
      {selected_images}
    </ZoneBox>
  )
}

export default Dropzone;