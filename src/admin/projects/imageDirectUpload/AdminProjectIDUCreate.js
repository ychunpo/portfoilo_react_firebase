import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { collection, addDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import styled from 'styled-components';
import {
  Button, ButtonGroup, Box, FormControl, FormLabel, FormErrorMessage,
  Heading, Input, Spacer, HStack, Textarea, Divider
} from '@chakra-ui/react';
import { storage, db } from '../../utils/firebase';
import { projectLabels } from '../../data/projectLabels';
import { projectDefaultValue } from '../../data/dataDefaultValue';
import { projectSchema } from '../../data/inputDataValidator';
import ImageCover from './projects_components/ImageCover';
import ImagesItemsIWU from './components/ImagesItemsIWU';

const APFContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 80%;
  font-family: "Poppins", sans-serif;
`

const AdminProjectCreate = () => {
  const navigation = useNavigate();
  //const [user] = useAuthState(auth);
  const [projectData, setProjectData] = useState(projectDefaultValue);
  //console.log('G - projectData: ', projectData);
  //const [coverUploaded, setCoverUploaded] = useState(false);
  //const [progress, setProgress] = useState(0);
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
        //const progressPercent = Math.round(
        //  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //);
        //setProgress(progressPercent);
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

  const uploadImageSubmit = handleSubmit((data) => {
    if (data.cover.image[0]?.type === 'image/gif'
      || data.cover.image[0]?.type === 'image/jpeg'
      || data.cover.image[0]?.type === 'image/png') {
      let img = data.cover.image[0]; // ok      
      data.cover.imageName = "";
      data.cover.imagePath = "";
      storageAndGetPath(data, img, 'cover');
      //setCoverUploaded(true);
    } else {
      toast("Please insert image!", { type: "error" });
      return;
    }
    //console.log('UploadImageSubmit->data: ', data)

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
      //console.log('UploadImageSubmit->data: ', data)
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

  const deleteCover = handleSubmit(() => {
    //console.log('data', data)
    var imgFather = document.getElementById("cover.imageParent");
    var imgElement = document.getElementById("cover.imageSon");
    var previewImg = document.getElementById("previewImg");
    if (previewImg === null) {
      toast("No Image", { type: "error" });
      return;
    }
    imgFather.removeChild(imgElement);

    const coverRef = ref(storage, `images/${projectData.cover.image[0].name}`);
    if (list(coverRef)) {
      deleteObject(coverRef).then(() => {
        toast("Deleted", { type: "success" });
      }).catch((error) => {
        toast("Storage Cannot Delete", { type: "error" });
        console.log('Delete Error', error)
      });
    }
    //setCoverUploaded(false);
  });

  const storeFirebase = async (projectData) => {
    //console.log('final - projectData: ', projectData);
    const projectRef = collection(db, "Projects");
    await addDoc(projectRef, projectData).then(() => {
      toast("Article added successfully", { type: "success" });
      //setProgress(0);
    }).catch((err) => {
      toast("Error adding article", { type: "error" });
    });
  }

  const onSubmit = (projectData) => (e) => {
    e.preventDefault();
    storeFirebase(projectData);
    //console.log('in - onSubmit: projectData', projectData)
    navigation('/admin/projects')
  }

  return (
    <APFContainer>
      <FormProvider {...methods}>
        <Box
          p='0 30px'
          bgColor='rgb(245, 205, 245)'
        >
          <Heading
            p="12px 0"
            fontSize='3xl'
            align="center"
            color="green.600"
          >
            Create Project
          </Heading>
          <Box>
            {projectLabels.map((item) => {
              const { id, name, title, type, require } = item;
              return (
                <Box key={id} p='2px 0'>
                  <FormControl size='lg'>
                    <FormLabel
                      m='auto'
                      p='0 3px'
                      htmlFor={name}
                    >
                      {title}
                    </FormLabel>
                    <Input
                      fontSize='1.2rem'
                      bg='white'
                      {...register(name, { required: require })}
                      type={type}
                      id={name}
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              )
            })}

            <Box>
              <FormControl>
                <FormLabel
                  m='auto'
                  p='0 3px'
                  htmlFor="description"
                >
                  Description
                </FormLabel>
                <Textarea
                  fontSize='1.2rem'
                  bg='white'
                  {...register("description")}
                  id="description"
                  placeholder='description'
                />
              </FormControl>
            </Box>
            <Divider p={2} borderColor='grey' w='98%' />
            <Box>
              <Box>
                <HStack alignContent='center'>
                  <Box w='90%'>
                    <ImageCover />
                  </Box>
                  <Spacer />
                  <Button
                    m='auto'
                    colorScheme='red'
                    onClick={deleteCover}
                  >
                    Clear
                  </Button>
                </HStack>
              </Box>
              <Box>
                <ImagesItemsIWU control={control} watch={watch} />
              </Box>
            </Box>
            <Divider p={2} borderColor='grey' w='98%' />
            <HStack w="90%" pt='20px'>
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
                  onClick={() => uploadImageSubmit(projectData)}>
                  Upload
                </Button>
                <Button
                  size='lg'
                  colorScheme='blue'
                  onClick={(e) => onSubmit(e, projectData)}
                >
                  Save
                </Button>
              </ButtonGroup>
            </HStack>
          </Box>
          <br />
        </Box>
      </FormProvider>
    </APFContainer>
  )
}

export default AdminProjectCreate;