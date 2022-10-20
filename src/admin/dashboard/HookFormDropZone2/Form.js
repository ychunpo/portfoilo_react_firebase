import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileInput from "./FileInput"

const validationSchema = yup.object().shape({
    file: yup.mixed(),
    caption: yup.string().required()
});

const Form = () => {
    const methods = useForm({ resolver: yupResolver(validationSchema) })
    //console.log(methods)
    const onSubmit = methods.handleSubmit((values) => console.log("values", values))


    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <div className="">
                    <FileInput

                        name="file alt text"
                        label="Cover Image"
                    />
                </div>

                <input type="submit" />
            </form>
        </FormProvider>
    )
}

export default Form