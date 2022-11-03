import React, { useMemo, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { collection, doc, deleteDoc, onSnapshot, query } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { AddIcon } from '@chakra-ui/icons'
import { APVContainer } from "./styled/APVContainer";
import { auth, db } from "../../utils/firebase";
import AdminTable from "./projects_components/AdminTable";





const AdminProjectsView = () => {
  const pattern = /.+\.(jpg|jpeg|png|gif)/gi;
  const storage = getStorage();
  const [allProjectsData, setAllProjectsData] = useState([]);
  //console.log('allProjectsData: ', allProjectsData)
  //const [hidden, setHidden] = useState(false);
  const [user] = useAuthState(auth);

  const tableColumns = useMemo(() => [
    {
      Header: 'Rank',
      accessor: 'rank',
    },
    {
      Header: 'Filename',
      accessor: 'filename',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Use',
      accessor: 'use',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Hidden',
      accessor: 'hidden',
    },
  ], [])

  const tableData = useMemo(() => allProjectsData)
  //console.log('tableData: ', tableData)

  useEffect(() => {
    const projectRef = collection(db, "Projects");
    const allData = query(projectRef);
    //console.log('allData: ', allData)
    const unsubscribe = onSnapshot(allData, (snapshot) => {
      const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProjectsData(projects);
    });
    return () => unsubscribe();
  }, []);

  const hiddenItem = (project) => {
    //project.hidden = !project.hidden;
  }

  const deleteItem = async (project) => {
    console.log('project', project)
    let valArray = [];
    let getter = (project) => {
      let values = Object.values(project);
      let getImageName = (val) => {
        if (Number.isInteger(val)) {
          return
        }
        let item = val.match(pattern);
        if (item !== null && val.includes('https') !== true) {
          valArray.push(val);
          return valArray
        }
      }
      values.forEach(val => {
        val && typeof val === 'object'
          ? getter(val) : getImageName(val);
      })
    }
    getter(project);
    //console.log('valArray: ', valArray);

    if (valArray.length !== 0) {
      valArray.forEach(async val => {
        const coverImageRef = ref(storage, `images/test2/${val}`);
        await deleteObject(coverImageRef).then(() => {
          console.log('All Image deleted');
        }).catch((error) => {
          console.log('Error', error);
        });
      })
    }

    await deleteDoc(doc(db, "Projects", project.id)).then(() => {
      toast("Delete successfully", { type: "success" });
    }).catch((error) => {
      toast("Cannot Delete", { type: "error" });
      console.log('Delete Error', error)
    });
  }

  return (
    <APVContainer>
      <div className="admin-project-main">
        <h1>Project Lists</h1>

        <span className="create-link">

          <Link to="/admin/project/create">
            <AddIcon w={6} h={6} color='blue.500' />
          </Link>
        </span>

        {allProjectsData.length === 0 ? (
          <p>Loading....</p>
        ) : (
          <div className="card-group" >

            <AdminTable
              columns={tableColumns}
              data={tableData}
              hiddenItem={hiddenItem}
              deleteItem={deleteItem}
            />

          </div>
        )}
      </div>
    </APVContainer>
  )
}

export default AdminProjectsView;