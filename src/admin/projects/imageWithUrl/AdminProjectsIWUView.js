import React, { useMemo, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { collection, doc, deleteDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { APVContainer } from "../styled/APVContainer";
import { db } from "../../../utils/firebase";
import AdminTable from "../projects_components/AdminTable";
import Loading from "../../admin_components/Loading";
import Fail from "../../admin_components/Loading/Fail";

const AdminProjectsView = () => {
  const navigation = useNavigate();
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadFail, setLoadFail] = useState(false);
  const tableColumns = useMemo(() => [
    { Header: 'Rank', accessor: 'rank', },
    { Header: 'Title', accessor: 'title', },
    { Header: 'Use', accessor: 'use', },
    { Header: 'Description', accessor: 'description', },
  ], []);
  const tableData = useMemo(() => (allProjectsData), [allProjectsData]);

  useEffect(() => {
    setLoading(true);
    const projectRef = collection(db, "Projects");
    const allData = query(projectRef, orderBy("rank", "asc"));
    const unsubscribe = onSnapshot(allData,
      async (snapshot) => {
        if (snapshot.docs.length !== 0) {
          const projects = await snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAllProjectsData(projects);
          setLoading(false);
        } else {
          setLoading(false);
          setLoadFail(true);
          console.log("Nothing in database")
        }
      },
      (error) => {
        console.log('Error message', error);
      }
    );
    return () => unsubscribe();
  }, []);

  const deleteItem = async (project) => {
    await deleteDoc(doc(db, "Projects", project.id)).then(() => {
      toast("Delete successfully", { type: "success" });
    }).catch((error) => {
      toast("Cannot Delete", { type: "error" });
      console.log('Delete Error', error);
    });
  }

  return (
    <APVContainer>
      <div className="APV-main">
        <Flex w="840px" justify="center" gap="270px">
          <Heading
            w="190px"
            p="5px"
            as='h4' size='lg'
            color='blue.500'
          >
            Project Lists
          </Heading>

          <Box mr="-290px">
            <Button
              mt="10px"
              onClick={() => navigation('/admin/project/create')}
            >
              <AddIcon w={7} h={7} color='blue.500' />
            </Button>
          </Box>
        </Flex>

        {loading ? (
          <div className="APV-pagesize">
            <Loading />
          </div>
        ) : loadFail ? (
          <div className="APV-pagesize">
            <Fail />
          </div>
        ) : (
          <div className="APV-table" >
            <AdminTable
              columns={tableColumns}
              data={tableData}
              deleteItem={deleteItem}
            />
          </div>
        )}
      </div>
    </APVContainer>
  )
}

export default AdminProjectsView;