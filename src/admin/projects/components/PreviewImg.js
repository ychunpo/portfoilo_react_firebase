import React, { useEffect, useState } from "react"
import styled from "styled-components"


const PreviewBox = styled.div`

  img{
    height: 300px;
    weight: 300px;
  }
`;

const PreviewImg = (props) => {
  const { imagesValue } = props;
  const [filesImage, setFilesImage] = useState([]);
  const [filesText, setFilesText] = useState("");

  //console.log('imagesValue 2', imagesValue);

  useEffect(() => {
    if (imagesValue.value) {
      const { value } = imagesValue;
      setFilesImage(value);
    }
  }, [imagesValue]);

  //console.log('filesImage', filesImage);

  useEffect(() => {
    filesImage.forEach(file => URL.revokeObjectURL(file.preview));
  }, [filesImage]);

  const handleChange = (e) => {
    setFilesText(e.target.value);
  }

  const previewImage = filesImage.map(file => (
    <div className="image-box" key={file.name}>
      <img
        src={file.preview}
        alt={file.name}
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
      />
    </div>
  ));

  //console.log(previewImage);

  return (
    <PreviewBox>
      {previewImage}
      {previewImage.length !== 0 && (
        <div>
          <label>File Text</label>
          <input
            type="text"
            name="filesText"
            value={filesText || ''}
            onChange={(e) => handleChange(e)}
          />
        </div>
      )}
    </PreviewBox>
  )
}

export default PreviewImg;