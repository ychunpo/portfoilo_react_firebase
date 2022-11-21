import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Container, Heading } from '@chakra-ui/react';
import { db, auth } from '../../utils/firebase';
import EditForm from './projects_components/EditForm';
import Loading from "../admin_components/Loading";
import Fail from "../admin_components/Loading/Fail";

const AdminProjectEdit = () => {
  const { id } = useParams();
  const docRef = doc(db, "Projects", id);
  const navigation = useNavigate();
  const [singleProjectData, setSingleProjectData] = useState("");
  //console.log('singleProjectData: ', singleProjectData)
  const [loading, setLoading] = useState(false);
  const [loadFail, setLoadFail] = useState(false);
  const singleData = useCallback((snapshot) => {
    setSingleProjectData({ ...snapshot.data() })
  }, [setSingleProjectData])

  function isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === '[object Object]' &&
      JSON.stringify(value) === '{}'
    );
  }

  useEffect(() => {
    //setLoading(true);
    const unsubscribe = onSnapshot(docRef,
      async (snapshot) => {
        //console.log('snapshot', snapshot.data());              
        if (isObjectEmpty(snapshot.data) === false) {
          await singleData(snapshot);
          setLoading(false);
        } else {
          setLoading(false);
          setLoadFail(true);
          console.log("No project in database")
        }
      })
    return () => unsubscribe();
  }, [singleData]);

  const handleCancel = () => {
    navigation('/admin/projects');
  }

  const handleUpdate = async (label, value) => {
    await updateDoc(docRef, {
      [label]: value
    })
  }

  const updateImageRecord = async () => {

  }

  return (
    <Container maxW='2x1' bg='gray.100'>
      <Heading
        p="5px"
        color='orange.300'
        as='h4' size='lg'
      >
        Edit Form
      </Heading>

      {loading ? (
        <Loading />
      ) : loadFail ? (
        <Fail />
      ) : (
        <EditForm
          data={singleProjectData}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          updateImageRecord={updateImageRecord}
        />
      )}
    </Container >
  )
}

export default AdminProjectEdit;
