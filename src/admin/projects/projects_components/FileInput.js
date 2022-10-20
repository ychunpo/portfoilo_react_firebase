import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { ZoneContainer } from "./styled/ZoneContainer";

const FileInput = props => {
    const { name, label, number } = props;
    const { register, unregister, setValue, watch } = useFormContext();
    const files = watch(name);
    const filesNum = parseInt(number);
    const labelCaption = label.toLowerCase() + ".caption"

    const onDrop = useCallback(
        acceptedFiles => {
            setValue(name, acceptedFiles, { shouldValidate: true })
        },
        [setValue, name]
    );

    const {
        fileRejections,
        getRootProps,
        getInputProps,
        isFocused,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: props.accept,
        maxFiles: filesNum,
    });

    //console.log('fileRejections: ', fileRejections)

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
            <div key={file.path}>

                {errors.map(e => <li key={e.code}>{e.message}</li>)}

            </div>
        )
    });

    useEffect(() => {
        register(name);
        register(labelCaption);
        return () => {
            unregister(name);
            unregister(labelCaption);
        }
    }, [register, unregister, name, labelCaption]);

    return (
        <ZoneContainer>
            <label className="APF-main-form-label" htmlFor={name}>
                {label} image :
            </label>
            {fileRejectionItems}
            <div className='zone-main'
                {...getRootProps(
                    { style: { isFocused, isDragAccept, isDragReject } }
                )}
                type="file"
                role="button"
                id={name}
            >
                <input {...props} {...getInputProps()} />
                <div className={" " + (isDragActive ? " " : " ")}>
                    <p className=" ">Drag and drop some files here, or click to select files</p>
                    <br />
                    {!!files?.length && (
                        <div className=" ">
                            {files.map(file => {
                                return (
                                    <div key={file.name}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            style={{ height: "300px", }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div>
                <label
                    className="APF-main-form-label"
                    htmlFor={labelCaption}
                >
                    {label} caption :
                </label>
                <input
                    type="text"
                    id={labelCaption}
                    {...register(labelCaption)}
                />
            </div>

        </ZoneContainer>
    )
}

export default FileInput;