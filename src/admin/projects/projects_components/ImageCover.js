import React from "react";
import FileInput from "./FileInput";

const ImageCover = () => {

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