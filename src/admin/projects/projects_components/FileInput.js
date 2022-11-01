import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { ZoneContainer } from "./sub_styled/ZoneContainer";

const FileInput = ({ name, label, max }) => {
    const propsData = { name, label, max };
    //const { name, label, maxNumber } = props;
    const { register, unregister, setValue, watch } = useFormContext();
    const files = watch(name);
    //console.log('files: ', files)
    const filesNum = parseInt(max);
    const labelCaption = label.toLowerCase() + ".caption";
    const labelText = label.toLowerCase() + ".text";

    const onDrop = useCallback(
        acceptedFiles => {
            setValue(name, acceptedFiles, { shouldValidate: true });
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
        //accept: accept,
        maxFiles: filesNum,
    });
    //console.log('getInputProps', getInputProps)

    const fileRejectionItems = fileRejections.map(({ file, error }) => {
        return (
            <div key={file.path}>
                {error.map(e => <li key={e.code}>{e.message}</li>)}
            </div>
        )
    });
    //console.log('fileRejections: ', fileRejections)
    //console.log('fileRejectionItems: ', fileRejectionItems)

    useEffect(() => {
        register(name);
        register(labelCaption);
        register(labelText)
        return () => {
            unregister(name);
            unregister(labelCaption);
            unregister(labelText)
        }
    }, [register, unregister, name, labelCaption, labelText]);

    return (
        <ZoneContainer>
            <label className="APF-main-form-label" htmlFor={name}>
                {label} image
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
                <input
                    {...propsData}
                    {...getInputProps()}
                    className="abcd"

                />
                <div className={" " + (isDragActive ? " " : " ")}>
                    <p className=" ">Drag and drop some files here, or click to select files</p>
                    <br />

                    {!!files?.length && (
                        <div className="father">
                            {files.map(file => {
                                return (
                                    <div key={file.name} id={name + 'Parent'}>
                                        <div id={name + 'Son'}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                style={{ height: "300px", }}
                                                id="previewImg"
                                            />
                                        </div>
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
                    {label} caption
                </label>
                <input
                    type="text"
                    id={labelCaption}
                    {...register(labelCaption)}
                />
                {name !== "cover.image" && (
                    <>
                        <label
                            className="APF-main-form-label"
                            htmlFor={labelText}
                        >
                            {label} text
                        </label>
                        <input
                            type="text"
                            id={labelText}
                            {...register(labelText)}
                        />
                    </>
                )}
            </div>
        </ZoneContainer>
    )
}

export default FileInput;