import React, { useState } from "react";
import { ref, getDownloadURL, getStorage, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { storage, db, auth } from '../../../utils/firebase';
import FileInput from "./FileInput";

const ImageCover = () => {
    const [progress, setProgress] = useState('');

    return (
        <div>
            <div className="">
                <FileInput
                    name="cover.image"
                    label="Cover"
                    max="1"
                />
            </div>
        </div>
    )
}

export default ImageCover;