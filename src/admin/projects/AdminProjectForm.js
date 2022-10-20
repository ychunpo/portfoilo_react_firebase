import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage, db, auth } from '../../utils/firebase';
import { APFContainer } from './styled/APFContainer';
import { projectLabels } from '../../data/projectLabels';
import { projectSchema } from '../../data/inputDataValidator';
import { projectDefaultValue } from '../../data/dataDefaultValue';
import FileInput from './projects_components/FileInput';
import ImageCover from './projects_components/ImageCover';
import ImagesItems from './projects_components/ImagesItems';

const AdminProjectForm = () => {
  let { type } = useParams();
  const [user] = useAuthState(auth);
  const [
    singleProjectData,
    setSingleProjectData
  ] = useState(projectDefaultValue);
  const navigation = useNavigate();
  const methods = useForm();
  const {
    control, register, formState: { errors }, watch
  } = methods;

  const onSubmit = methods.handleSubmit((values) => console.log("values", values));

  //const onSubmit = (data) => {
  // if (!singleProjectData.title || !singleProjectData.description || !singleProjectData.websiteUrl) {
  //   alert("Please fill this field");
  //   return;
  // }

  //console.log(data)

  // const storageRef = ref(
  //   storage,
  //   `/images/${singleProjectData.imageUrl.name}`
  // );

  // const uploadImage = uploadBytesResumable(storageRef, singleProjectData.imageUrl);

  // uploadImage.on(
  //   "state_changed",
  //   (snapshot) => {
  //     const progressPercent = Math.round(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     );
  //     setProgress(progressPercent);
  //   },
  //   (error) => {
  //     //console.log(error);
  //   },
  //   () => {
  //     getDownloadURL(uploadImage.snapshot.ref).then((url) => {
  //       const projectRef = collection(db, "Projects");
  //       addDoc(projectRef, {
  //         rank: singleProjectData.rank,
  //         title: singleProjectData.title,
  //         use: singleProjectData.use,
  //         description: singleProjectData.description,
  //         website: singleProjectData.website,
  //         video: singleProjectData.video,
  //         code: singleProjectData.code,
  //         uiux: singleProjectData.uiux,
  //         images: [],
  //       })
  //         .then(() => {
  //           toast("Article added successfully", { type: "success" });
  //           setProgress(0);
  //         })
  //         .catch((err) => {
  //           toast("Error adding article", { type: "error" });
  //         });
  //     })
  //   }
  //)
  //}

  return (
    <APFContainer>
      <FormProvider {...methods}>
        <div className="APF-main">
          <div className="APF-main-header">
            <div className="APF-main-title">
              {
                type === 'create' ? (<p>Create Project</p>) : (<p>Project List</p>)
              }
            </div>
          </div>
          <form className="form" onSubmit={onSubmit}>
            {
              projectLabels.map((item) => {
                let { id, name, title, type, require } = item;
                return (
                  <div className="APF-main-form-item" key={id}>
                    <label className="APF-main-form-label" htmlFor={name}>
                      {title}
                    </label>
                    <input
                      {...register(name, { required: require })}
                      type={type}
                      id={name}
                      className="APF-main-form-input"
                    />
                  </div>
                )
              })
            }

            <div className="APF-main-form-item">
              <label className="APF-main-form-label" htmlFor="description">
                Description :
              </label>
              <br />
              <textarea
                {...register("description")}
                id="description"
                className="form-input"
              />
            </div>

            <div className="APF-main-form-item">
              <div className="cover-image">
                <ImageCover />
              </div>
              <div className="item-image">
                <ImagesItems {...{ control, watch }} />
              </div>
            </div>

            <div className="APF-main-btn-group">
              <input
                type="button"
                value="Cancel"
                onClick={() => navigation('/admin/projects')}
              />

              <input type="submit" value="Save" />
            </div>
          </form>
        </div>
      </FormProvider>
    </APFContainer>
  )
}

export default AdminProjectForm;