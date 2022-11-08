import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import {
    Button, ButtonGroup, Box,
    Center, Container,
    Flex,
    Heading,
    Image, Input,
    Spacer,
    Text, Textarea
} from '@chakra-ui/react';
import { ZoneContainer } from "./sub_styled/ZoneContainer";

const FileInput = ({ name, label, max }) => {
    const propsData = { name, label, max };
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
            <Box className='zone-main'
                {...getRootProps(
                    { style: { isFocused, isDragAccept, isDragReject } }
                )}
                type="file"
                role="button"
                id={name}
            >
                <Input
                    size='lg'
                    {...propsData}
                    {...getInputProps()}
                />
                <div className={" " + (isDragActive ? " " : " ")}>
                    <Text>Drag and drop some files here, or click to select files</Text>
                    {!!files?.length && (
                        <div className="father">
                            {files.map((file, index) => {
                                return (
                                    <div key={file.name} id={name + 'Parent'}>
                                        <Box id={name + 'Son'}>
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                id="previewImg"
                                                boxSize='200px'
                                                objectFit='contain'
                                                fallbackSrc='https://via.placeholder.com/200'
                                            />
                                        </Box>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </Box>
            <Box>
                <label
                    className="APF-main-form-label"
                    htmlFor={labelCaption}>
                    {label} caption
                </label>
                <Input
                    fontSize='1.2rem'
                    bg='white'

                    id={labelCaption}
                    {...register(labelCaption)}
                    className="APF-main-form-item-input"
                />
                {name !== "cover.image" && (
                    <>
                        <label
                            className="APF-main-form-label"
                            htmlFor={labelText}
                        >
                            {label} text
                        </label>
                        <Input
                            fontSize='1.2rem'
                            bg='white'

                            id={labelText}
                            {...register(labelText)}
                            className="APF-main-form-item-input"
                        />
                    </>
                )}
            </Box>
        </ZoneContainer>
    )
}

export default FileInput;