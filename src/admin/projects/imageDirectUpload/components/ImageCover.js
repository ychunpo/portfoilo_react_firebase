import React from "react";
import FileInput from "./FileInput";

const ImageCover = () => {
    return (
        <>
            <FileInput
                name="cover.image"
                label="Cover"
                max="1"
            />
        </>
    )
}

export default ImageCover;