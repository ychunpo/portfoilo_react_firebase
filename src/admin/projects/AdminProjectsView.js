import React, { useMemo, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { collection, onSnapshot, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { APVContainer } from "./styled/APVContainer";
import { auth, db } from "../../utils/firebase";
import AdminTable from "./projects_components/AdminTable";

const AdminProjectsView = () => {
  const [allProjectsData, setAllProjectsData] = useState([]);
  //console.log('allProjectsData: ', allProjectsData)
  //const [hiddenItem, setHiddenItem] = useState(false);
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
  ], [])

  const tableData = useMemo(() => allProjectsData)
  //console.log('tableData: ', tableData)

  useEffect(() => {
    const projectRef = collection(db, "Projects");
    const allData = query(projectRef);
    //console.log('allData: ', allData)
    onSnapshot(allData, (snapshot) => {
      const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProjectsData(projects);
    });
  }, []);

  const hiddenItem = (project) => {
    //project.hidden = !project.hidden;
  }

  const deleteItem = (index) => {

  }

  return (
    <APVContainer>
      <div className="admin-project-main">
        <h1>Project Lists</h1>
        <span className="create-link">

          <Link to="/admin/project/create">Create</Link>
        </span>

        {allProjectsData.length === 0 ? (
          <p>No record found!</p>
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