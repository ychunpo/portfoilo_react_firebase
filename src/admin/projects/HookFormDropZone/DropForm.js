import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import "./DropForm.css";

//import * as S from "./styledStyles";

const validationSchema = Yup.object().shape({
  file: Yup.mixed(),
  name: Yup.string().required()
});

export default function DropForm() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [submitedString, setSubmitedString] = React.useState("");
  const { register, errors, handleSubmit, control, setValue } = useForm({
    validationSchema
  });

  const onDrop = useCallback(files => {
    console.log('files: ', files);
    setValue("file", files);
  }, [])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop
  });



  // React.useEffect(() => {
  //   register({ name: "file" });
  // }, []);

  React.useEffect(() => {
    setSelectedFile(acceptedFiles[0]);
  }, [acceptedFiles]);

  const onSubmit = data => {
    console.log(data);
    setSubmitedString(JSON.stringify(data));
  };

  return (
    <div className="DFContainerApp">
      <h1>React Hook Form With React Dropzone</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {selectedFile && (
          <div>
            <button
              onClick={() => setSelectedFile(null)}

            >
              Remove
            </button>
            <span>{selectedFile}</span>
          </div>
        )}

        {!selectedFile && (
          <>
            <div
              {...getRootProps({ onClick: e => e.preventDefault() })}
            >
              <p>Drag 'n' drop file here, or click to select file</p>
              {/* <Controller
                as={<input />}
                type="file"
                name="file"
                control={control}
                {...getInputProps()}
              /> */}
              <input
                // onChange={e => changeFile(e)}
                {...getInputProps()}
              />
            </div>
          </>
        )}
        <input
          {...register('name')}
        />

        <button type="submit">SEND</button>
      </form>
      <p style={{ marginTop: "30px" }}>{submitedString}</p>
    </div>
  );
}
