import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, onSnapshot } from 'firebase/firestore';
import { Container, Heading } from '@chakra-ui/react';
import { db } from '../../../utils/firebase';
import EditForm from '../projects_components/EditForm';
import Loading from "../../admin_components/Loading";
import Fail from "../../admin_components/Loading/Fail";

const AdminProjectEdit = () => {
  const { id } = useParams();
  const docRef = doc(db, "Projects", id);

  const [singleProjectData, setSingleProjectData] = useState("");
  //console.log('singleProjectData: ', singleProjectData)
  const [loading, setLoading] = useState(false);
  const [loadFail, setLoadFail] = useState(false);
  const singleData = useCallback((snapshot) => {
    setSingleProjectData({ ...snapshot.data() })
  }, [setSingleProjectData]);

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
          toast("No project in database", { type: "error" });
        }
      })
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleData]);

  return (
    <Container maxW='100%' bg='gray.200'>
      <Heading
        pt="13px"
        color='purple.600'
        as='h2' size='xl'
        align="center"
      >
        Edit Form
      </Heading>

      {loading ? (
        <Loading />
      ) : loadFail ? (
        <Fail />
      ) : (
        <EditForm
          id={id}
          data={singleProjectData}
        />
      )}
    </Container >
  )
}

export default AdminProjectEdit;
