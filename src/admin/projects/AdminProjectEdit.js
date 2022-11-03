import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { list, ref, getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Container, Heading } from '@chakra-ui/react';
import { db, auth } from '../../utils/firebase';
import EditForm from './projects_components/EditForm';

const AdminProjectEdit = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [singleProjectData, setSingleProjectData] = useState();
  console.log('singleProjectData: ', singleProjectData)

  const singleData = useCallback((snapshot) => {
    setSingleProjectData({ ...snapshot.data() })
  }, [setSingleProjectData])

  useEffect(() => {
    const docRef = doc(db, "Projects", id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      singleData(snapshot);
    })
    return () => unsubscribe();
  }, [singleData]);

  const handleCancel = () => {
    navigation('/admin/projects');
  }

  const handleUpdate = () => {

  }


  return (
    <Container maxW='2x1' bg='gray.100'>
      <Heading align='center'>Edit Form</Heading>

      {!singleProjectData ? (
        <p>Loading.....</p>
      ) : (
        <EditForm
          data={singleProjectData}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
        />
      )}

    </Container >
  )
}

export default AdminProjectEdit;
