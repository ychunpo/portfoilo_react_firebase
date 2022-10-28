import React, { useState } from "react";
import { ref, getDownloadURL, getStorage, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { storage, db, auth } from '../../../utils/firebase';
import FileInput from "./FileInput";

const ImageCover = () => {
    const [progress, setProgress] = useState('');
    //const uploadImgRef = ref(storage, `/images/${img.name}`)
    // const imageStoreRef = ref(storage, `/images/cover`)

    // const uploadImage = uploadBytesResumable(imageStoreRef, img);    

    return (
        <div>
            <div className="">
                <FileInput
                    name="cover.image"
                    label="Cover"
                    number="1"
                />
            </div>
        </div>
    )
}

export default ImageCover;