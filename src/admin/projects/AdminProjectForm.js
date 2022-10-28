import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { storage, db, auth } from '../../utils/firebase';
import { APFContainer } from './styled/APFContainer';
import { projectLabels } from '../../data/projectLabels';
import { projectDefaultValue } from '../../data/dataDefaultValue';
import { projectSchema } from '../../data/inputDataValidator';
import ImageCover from './projects_components/ImageCover';
import ImagesItems from './projects_components/ImagesItems';

const AdminProjectForm = () => {
  let { type } = useParams();
  const navigation = useNavigate();
  const [user] = useAuthState(auth);
  const [
    singleProjectData,
    setSingleProjectData
  ] = useState(projectDefaultValue);
  //console.log('singleProjectData start: ', singleProjectData)
  //const [singleProjectImgUrl, setSingleProjectImgUrl] = useState();
  const [progress, setProgress] = useState('');
  const methods = useForm();
  //console.log('methods', methods)
  const {
    control, register, formState: { errors }, watch, handleSubmit
  } = methods;
  //console.log('handleSubmit: ', handleSubmit)

  const cover = {}
  const items = []
  const itemsFiles = { items: [] };
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
    }).then(() => {
      toast("Article added successfully", { type: "success" });
      setProgress(0);
    }).catch((err) => {
      toast("Error adding article", { type: "error" });
    });
  }


  // onUploadImageSubmit
  const onUploadImageSubmit = handleSubmit((data) => {
    if (!user) {
      return navigation('/auth');
    }

    console.log('uploadData: ', data)
    let allImages = [];
    let allDataImagesUrl = [];

    if (data.cover?.image) {
      allImages.push(data.cover.image[0])
      allDataImagesUrl.push(0)
    } else {
      toast("Please insert cover image!", { type: "error" });
      return;
    }

    if (data.items) {
      for (let i = 0; i < data.items.length; i++) {
        //data.items[i].imgUrl = [];
        for (let j = 0; j < data.items[i].image.length; j++) {
          //data.items[i].imgUrl[j] = ""
          allImages.push(data.items[i].image[j])
          let url = [i, j];
          allDataImagesUrl.push(url);
        }
      }
    }

    allImages.forEach((img, key) => {
      const imageStoreRef = ref(
        storage, `/images/${img.name}`
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
          console.log("Upload failed:", error);
        },
        async () => {

          await getDownloadURL(uploadImage.snapshot.ref).then((url) => {

            if (typeof allDataImagesUrl[key] === 'number') {
              let image = {}
              //data.cover.imgUrl = url;              
              cover.caption = data.cover.caption;
              image.storageUrl = url;
              image.name = img.name;
              cover.image = image;
            } else {
              const [i, j] = allDataImagesUrl[key];
              //data.items[i].imgUrl[j] = url;
              //itemsFiles.items[i].imgUrl[j] = url;
              //items.push({ caption: data.items[i].caption})
              //for (let i = 0; )

              //     }
              //   }
              // }
            }
          }).catch(error => {
            console.log(error)
          });
        }
      )
      //console.log('cover', cover)
      setSingleProjectData({ ...singleProjectData, cover })
      console.log('itemsFiles', itemsFiles)
      console.log('items', items)
    });
    console.log('allImages', allImages)
    console.log('allDataImageUrl', allDataImagesUrl)

    console.log('singleProjectData progress: ', singleProjectData)
    console.log('update data: ', data)
  })

  const onDeleteCover = handleSubmit((data) => {
    console.log('data', data)
    var imgFather = document.getElementById("cover.imageParent");
    var imgElement = document.getElementById("cover.imageSon");
    var previewImg = document.getElementById("previewImg");
    if (previewImg === null) {
      toast("No Image", { type: "error" });
      return;
    }
    imgFather.removeChild(imgElement);

    const coverRef = ref(storage, `images/${data.cover.image[0].name}`);
    if (list(coverRef)) {
      deleteObject(coverRef).then(() => {
        toast("Deleted", { type: "success" });
      }).catch((error) => {
        toast("Cannot Delete", { type: "error" });
        console.log('Delete Error', error)
      });
    } else {
      toast("Database is no this image", { type: "error" });
    }
  });







  const onSubmit = handleSubmit((data) => {
    if (!data) return;
    if (!user) {
      return navigation('/auth');
    }
    console.log('update data: ', data)

    //setSingleProjectData({ ...data });
    //storeFirebase(...data);
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
                <button onClick={onDeleteCover}>
                  Delete Cover Image
                </button>
              </div>
              <div className="item-image">
                <ImagesItems {...{ control, watch }} />
              </div>
            </div>
            <div>
              <button onClick={onUploadImageSubmit}>
                Upload All Image
              </button>
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