import React, { useCallback, useState } from 'react';
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

const ZoneContainer = styled.div`
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
  console.log(selectedImages);
  const [caption, setCaption] = useState('');

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


  const handleChange = (e) => {
    setCaption(e.target.value)
  }

  const selected_images = () => {
    selectedImages.map(file => {
      return (
        <div key={file.name}>
          <img
            src={file.preview}
            style={{ width: "200px" }}
            alt=""
          />
        </div>
      )
    });
    <input
      className='caption'
      type='text'
      name='imagesText'
      placeholder='Enter a caption'

      onChange={(e) => handleChange(e)}
    />
  }

  const addText = () => {

    let data = [];
    data.push(selectedImages);
    return data;
  }




  return (
    <ZoneContainer>
      <div className='zone'
        {...getRootProps(
          { style: { isFocused, isDragAccept, isDragReject } }
        )}
      >
        <input
          {...getInputProps()}
        />
        <p>Drop the images here ...</p>
      </div>


      {selected_images}
    </ZoneContainer>
  )
}


export default Dropzone;