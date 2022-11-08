import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import FileInput from "./FileInput";

const ImageCover = () => {
    return (
        <>
            <FileInput
                name="cover.image"
                label="Cover"
                max="1"
            />
            <br />
        </>
    )
}

export default ImageCover;