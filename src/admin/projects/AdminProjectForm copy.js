import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage, db, auth } from '../../utils/firebase';
import { APFContainer } from './styled/APFContainer';
import { projectLabels } from '../../data/projectLabels';
import { projectSchema } from '../../data/inputDataValidator';
import { projectDefaultValue } from '../../data/dataDefaultValue';
import ImageCover from './projects_components/ImageCover';
import ImagesItems from './projects_components/ImagesItems';

const AdminProjectForm = () => {
  let { type } = useParams();

  const [user] = useAuthState(auth);
  const [
    singleProjectData,
    setSingleProjectData
  ] = useState(projectDefaultValue);
  //console.log('singleProjectData start: ', singleProjectData)
  const [singleProjectImgUrl, setSingleProjectImgUrl] = useState();
  const [progress, setProgress] = useState('');

  const navigation = useNavigate();
  const methods = useForm();
  console.log('methods', methods)
  const {
    control, register, formState: { errors }, watch, handleSubmit
  } = methods;
  //console.log('handleSubmit: ', handleSubmit)  
  const formData = handleSubmit((data) => {
    return { ...data };
  })

  //console.log('formData: ', formData)

  const storeFirebase = async (singleProjectData) => {
    let imgCover = singleProjectData.cover.imgUrl;
    console.log('imgCover: ', ...imgCover);
    //console.log('data: ', singleProjectData);
    const projectRef = collection(db, "Projects");
    await addDoc(projectRef, {
      rank: singleProjectData.rank,
      title: singleProjectData.title,
      use: singleProjectData.use,
      description: singleProjectData.description,
      website: singleProjectData.website,
      video: singleProjectData.video,
      code: singleProjectData.code,
      uiux: singleProjectData.uiux,
      cover: {
        caption: singleProjectData.cover['caption'],
        //images: singleProjectData.cover['imgUrl'],

      },
      items: [
        {
          caption: singleProjectData.items
          //items[0].caption
        }
      ],
    })
      .then(() => {
        toast("Article added successfully", { type: "success" });
        setProgress(0);
      })
      .catch((err) => {
        toast("Error adding article", { type: "error" });
      });
  }

  const onSubmit = methods.handleSubmit((data) => {
    let allImages = [];
    let allDataImagesUrl = [];
    //let firebaseUrl = [];

    if (!data) return;
    if (!user) {
      return navigation('/auth');
    }
    //console.log('data: ', data)

    if (data.cover?.image) {
      data.cover.imgUrl = "";
      // Object.defineProperty(data.cover, "imgUrl", {
      //   value: '',
      //   writable: true,
      //   enumerable: true,
      //   configurable: true,
      // })
      allImages.push(data.cover.image[0])
      allDataImagesUrl.push(0)
    } else {
      toast("Please insert cover image!", { type: "error" });
      return;
    }

    if (data.items) {
      for (let i = 0; i < data.items.length; i++) {
        data.items[i].imgUrl = [];
        for (let j = 0; j < data.items[i].image.length; j++) {
          data.items[i].imgUrl[j] = ""
          allImages.push(data.items[i].image[j])
          const url = [i, j];
          allDataImagesUrl.push(url);
        }
      }
    }
    //console.log('allDataImagesUrl', allDataImagesUrl)
    allImages.forEach((img, key) => {
      console.log('img: ', img)
      const imageStoreRef = ref(
        storage,
        `/images/${img.name}`
      );

      const uploadImage = uploadBytesResumable(imageStoreRef, img);

      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        (error) => {
          console.log("Error Image Upload:", error);
        },
        async () => {
          await getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            //console.log("File available at", url);
            if (typeof allDataImagesUrl[key] === 'number') {
              //delete data.cover.image;
              data.cover.imgUrl = url;
              //firebaseUrl.cover = url
              //console.log('cover-url', typeof data.cover.imgUrl)
            } else {
              const [i, j] = allDataImagesUrl[key];
              //console.log('allDataImagesUrl[key]: ', allDataImagesUrl[key])       
              //console.log('data.items[i].firebase[j]: ', data.items[i].firebase[j])  
              //delete data.items[i].image
              data.items[i].imgUrl[j] = url;
              //firebaseUrl.items[i].imgUrl = []
            }
          });
        }
      )
    });
    setSingleProjectData({ ...data });
    //console.log('singleProjectData progress: ', singleProjectData)
    // input addDoc

    //data.firebaseUrl = firebaseUrl;
    console.log('update data: ', data)
    //storeFirebase(data);
    //console.log('firebaseUrl: ', firebaseUrl)
    //console.log('fb-url', data.cover.imgUrl)

  })

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