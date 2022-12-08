import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import {
  Button, ButtonGroup, Box,
  Flex,
  Heading,
  Input,
  Spacer,
  Stack, HStack,
  Text, Textarea
} from '@chakra-ui/react';
import { storage, db } from '../../utils/firebase';
import { APFContainer } from './styled/APFContainer';
import { projectLabels } from '../../data/projectLabels';
import { projectDefaultValue } from '../../data/dataDefaultValue';
import { projectSchema } from '../../data/inputDataValidator';
import ImageCover from './projects_components/ImageCover';
import ImagesItems from './projects_components/ImagesItems';

const AdminProjectCreate = () => {
  const navigation = useNavigate();
  //const [user] = useAuthState(auth);
  const [projectData, setProjectData] = useState(projectDefaultValue);
  //console.log('G - projectData: ', projectData);
  const [progress, setProgress] = useState("");
  const methods = useForm({ resolver: yupResolver(projectSchema) });
  const {
    control, register, formState: { errors }, watch, handleSubmit
  } = methods;

  // storage--->
  const storageAndGetPath = (data, img, type, i, j) => {
    const storageRef = ref(storage, `/images/${img.name}`);
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
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((downloadUrl) => {
          if (type === 'cover') {
            data.cover.imageName = img.name;
            data.cover.imagePath = downloadUrl;
            setProjectData(previousState => {
              return { ...previousState, coverImageFilename: img.name, coverImagePath: downloadUrl }
            })
          }
          //console.log('In -> storage -> async: getCoverImagePath', getStorageImagePath)
          if (type === 'item') {
            data.items[i].images.push({
              imagePath: downloadUrl,
              imageId: j,
              imageName: img.name,
            });
          }
          //console.log('In -> storage -> async: getItemImagePath', getStorageImagePath)

        }).catch(error => {
          console.log(error);
          toast("Image added fail", { type: "error" });
        });
      });
  }

  // onUploadImageSubmit
  const uploadImageSubmit = handleSubmit((data) => {
    if (data.cover.image[0]?.type === 'image/gif'
      || data.cover.image[0]?.type === 'image/jpeg'
      || data.cover.image[0]?.type === 'image/png') {
      let img = data.cover.image[0]; // ok      
      data.cover.imageName = "";
      data.cover.imagePath = "";
      storageAndGetPath(data, img, 'cover');
    } else {
      toast("Please insert image!", { type: "error" });
      return;
    }
    //console.log('onUploadImageSubmit->data: ', data)

    // item
    if (data.items.length !== 0) {
      for (let i = 0; i < data.items.length; i++) {
        data.items[i].itemId = i;
        data.items[i].images = [];
        for (let j = 0; j < data.items[i].image.length; j++) {
          let img = data.items[i].image[j]
          storageAndGetPath(data, img, 'item', i, j);
        }
        delete data.items[i].image;
      }
    }

    const dataUpdate = (data) => {
      //console.log('onUploadImageSubmit->data: ', data)
      setProjectData({
        rank: data.rank,
        title: data.title,
        use: data.use,
        description: data.description,
        websiteUrl: data.website,
        videoUrl: data.video,
        gitUrl: data.git,
        uiuxUrl: data.uiux,
        coverCaption: data.cover.caption,
        coverImageFilename: data.cover.imageName,
        coverImagePath: data.cover.imagePath,
        items: data.items,
        hide: false,
      })
    }
    dataUpdate(data);
    toast("Image added successfully", { type: "success" });
  });

  // deleteCover--->
  const deleteCover = handleSubmit((data) => {
    //console.log('data', data)
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

  // storeFirebase--->
  const storeFirebase = async (projectData) => {
    console.log('final - projectData: ', projectData);
    const projectRef = collection(db, "Projects");
    await addDoc(projectRef, projectData).then(() => {
      toast("Article added successfully", { type: "success" });
      setProgress(0);
    }).catch((err) => {
      toast("Error adding article", { type: "error" });
    });
  }

  // save with fireStore
  const onSubmit = (projectData) => {
    console.log('in - onSubmit: projectData', projectData)
    storeFirebase(projectData);
    navigation('/admin/projects')
  }

  return (
    <APFContainer>
      <FormProvider {...methods}>
        <div className="APF-main">
          <Heading
            pt="11px"
            as='h2'
            fontSize='3xl'
            align="center"
            color="green.800"
          >
            Create Project
          </Heading>
          <form className="APF-main-form">
            {projectLabels.map((item) => {
              let { id, name, title, type, require } = item;
              return (
                <div className="APF-main-form-item" key={id}>
                  <label className="APF-main-form-label" htmlFor={name}>
                    {title}
                  </label>
                  <Input
                    fontSize='1.2rem'
                    bg='white'
                    {...register(name, { required: require })}
                    type={type}
                    id={name}
                    className="APF-main-form-item-input"
                  />
                  <span>
                    {errors[name] && errors[name]['message']}
                  </span>
                </div>
              )
            })}

            <div className="APF-main-form-item">
              <label className="APF-main-form-label" htmlFor="description">
                Description
              </label>
              <Textarea
                fontSize='1.2rem'
                bg='white'
                {...register("description")}
                id="description"
                className="APF-main-form-item-textarea"
                placeholder='description'
              />
            </div>
            <div className="APF-main-form-item">
              <Box>
                <Flex alignItems='center'>
                  <Box w='90%'>
                    <ImageCover />
                  </Box>
                  <Spacer />
                  <Button
                    colorScheme='red'
                    onClick={deleteCover}
                  >
                    Clear
                  </Button>
                </Flex>
              </Box>
              <Box>
                <ImagesItems {...{ control, watch }} />
              </Box>
            </div>
            <HStack w="90%">
              <ButtonGroup variant='outline' spacing='50px' m="0 auto">
                <Button
                  size='lg'
                  colorScheme='orange'
                  onClick={() => navigation('/admin/projects')}
                >
                  Cancel
                </Button>
                <Button
                  size='lg'
                  colorScheme='green'
                  onClick={uploadImageSubmit}>
                  Upload
                </Button>
                <Button
                  size='lg'
                  colorScheme='blue'
                  onClick={() => onSubmit(projectData)}
                >
                  Save
                </Button>
              </ButtonGroup>
            </HStack>
          </form>
          <br />
        </div>
      </FormProvider>
    </APFContainer >
  )
}

export default AdminProjectCreate;