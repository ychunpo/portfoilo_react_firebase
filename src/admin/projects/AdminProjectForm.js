import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider, get } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc } from 'firebase/firestore';
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
  const navigation = useNavigate();
  const [user] = useAuthState(auth);
  const [projectData, setProjectData] = useState(projectDefaultValue);
  console.log('G - projectData: ', projectData)
  const [getCoverImagePath, setGetCoverImagePath] = useState("");
  //console.log('G - getCoverImagePath: ', getCoverImagePath);
  const [getItemImagePath, setGetItemImagePath] = useState([]);
  //console.log('G - getItemImagePath: ', getItemImagePath)
  const [progress, setProgress] = useState("");
  const [items, setitems] = useState([]);
  console.log('G - items: ', items);

  const [itemListNo, setItemListNo] = useState([]);
  //let itemListNo = []
  //console.log('G - itemListNo', itemListNo);

  const methods = useForm({ resolver: yupResolver(projectSchema) });
  const {
    control, register, formState: { errors }, watch, handleSubmit
  } = methods;
  //console.log('errors: ', errors)

  const storageAndGetPath = (data, img, type, cover) => {
    const storageRef = ref(storage, `/images/${data.filename}/${img.name}`);
    const uploadImage = uploadBytesResumable(storageRef, img);

    uploadImage.on("state_changed",
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
        await getDownloadURL(uploadImage.snapshot.ref).then((downloadUrl) => {

          console.log('downloadUrl type: ', downloadUrl)
          if (type === 'cover') {
            setGetCoverImagePath(downloadUrl);
          }

          if (type === 'item') {
            setGetItemImagePath(previousState => {
              return [...previousState, downloadUrl]
            });
          }
        }).catch(error => {
          console.log(error)
        });
      });
  }

  const storeFirebase = async (projectData) => {
    //console.log('data: ', projectData);
    const projectRef = collection(db, "Projects");
    await addDoc(projectRef, projectData).then(() => {
      toast("Article added successfully", { type: "success" });
      setProgress(0);
    }).catch((err) => {
      toast("Error adding article", { type: "error" });
    });
  }

  // onUploadImageSubmit
  const onUploadImageSubmit = handleSubmit((data) => {
    console.log('uploadData: ', data)

    if (data.cover.image[0]?.type === 'image/gif'
      || data.cover.image[0]?.type === 'image/jpeg'
      || data.cover.image[0]?.type === 'image/png') {
      let img = data.cover.image[0];
      storageAndGetPath(data, img, 'cover');
      data.coverImagePath = getCoverImagePath;
    } else {
      toast("Please insert image!", { type: "error" });
      return;
    }

    if (data.items) {
      for (let i = 0; i < data.items.length; i++) {
        items.push({
          itemId: i,
          itemCaption: data.items[i].caption,
          itemText: data.items[i].text,
          itemImages: []
        });
        console.log('In items: ', items)

        for (let j = 0; j < data.items[i].image.length; j++) {
          console.log('in func: ', getItemImagePath)
          items[i].itemImages.push({
            itemImageId: j,
            itemImageFilename: data.items[i].image[j].name,
            itemImagePath: '',
          });
          let img = data.items[i].image[j]
          storageAndGetPath(data, img, 'item');

          let url = { i: i, j: j };
          itemListNo.push(url);
        }
      }

    } else {
      toast("Please insert image!", { type: "error" });
      return;
    }

    //console.log('projectData progress: ', projectData)
    console.log('update data: ', data)
  });

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

    const coverRef = ref(storage, `images/${data.filename}/${data.cover.image[0].name}`);
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

  // save with fireStore
  const onSubmit = handleSubmit((data) => {
    if (!data) return;
    console.log('update data with onSubmit: ', data)

    for (let num = 0; num < itemListNo.length; num++) {
      //console.log('getItemImagePath[num]:', getItemImagePath[num])
      let i = itemListNo[num].i;
      let j = itemListNo[num].j;
      let path = items[i]
      let pathTwo = path.itemImages[j]
      pathTwo.itemImagePath = getItemImagePath[num];
    }

    setProjectData({
      ...projectData,
      rank: data.rank,
      filename: data.filename,
      title: data.title,
      use: data.use,
      description: data.description,
      websiteUrl: data.website,
      videoUrl: data.video,
      codeUrl: data.code,
      uiuxUrl: data.uiux,
      coverCaption: data.cover.caption,
      coverImageFilename: data.cover.image[0].name,
      coverImagePath: getCoverImagePath,
      items: items
    })

    storeFirebase(projectData);
    navigation('/admin/projects')
  })

  return (
    <APFContainer>
      <FormProvider {...methods}>
        <div className="APF-main">
          <div className="APF-main-header">
            <div className="APF-main-title">
              <p>Create Project</p>
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
                    <span>
                      {errors[name] && errors[name]['message']}
                    </span>
                  </div>
                )
              })
            }

            <div className="APF-main-form-item">
              <label className="APF-main-form-label" htmlFor="description">
                Description
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