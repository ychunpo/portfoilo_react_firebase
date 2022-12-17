import React, { useState } from 'react'

const FileUpload = () => {
  const [image, setImage] = useState(null);
  console.log('image', image);


  const onImageChange = (e) => {
    const reader = new FileReader();
    //console.log('reader', reader)
    //console.log('e.target', e.target)
    let file = e.target.files[0];
    //console.log('file', file)
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const uploadToStorage = () => {
    if (image) {
      console.log('image', image)
      let imageRef = ref(storage, `/images/${image.name}`);
      uploadBytes(imageRef, image).then((imgUrl) => {
        console.log('imgUrl: ', imgUrl)
        getFromStorage();
        setImage(null);
        toast("Image uploaded successfully", { type: "success" });
      });
    } else {
      toast("Please upload an image first.", { type: "error" });
    }
  }



  return (
    <div>
      <input
        w="70%"
        type="file"
        className="APIV-input"
        onChange={(e) => { onImageChange(e) }}
      />
    </div>
  )
}

export default FileUpload