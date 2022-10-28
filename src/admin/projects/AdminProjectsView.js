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
  console.log('allProjectsData: ', allProjectsData)
  //const [hiddenItem, setHiddenItem] = useState(false);
  const [user] = useAuthState(auth);

  const columns = useMemo(() => [
    {

    }
  ])

  useEffect(() => {
    const projectRef = collection(db, "Projects");
    const allData = query(projectRef);
    onSnapshot(allData, (snapshot) => {
      const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProjectsData(projects);
    });
  }, []);

  const onDragEnd = (result) => {

  }

  const handleHiddenItem = (project) => {
    project.hidden = !project.hidden;
  }


  const deleteItem = (index) => {

  }

  return (
    <APVContainer>
      <div className="admin-project-main">
        <div className="create-link">
          <Link to="/admin/project/create">Create</Link>
        </div>
        {allProjectsData.length === 0 ? (
          <p>No record found!</p>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {allProjectsData.map(
                    (project, index) => {
                      return (
                        <Draggable key={project.id} draggableId={project.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              snapshot={snapshot}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >

                              <div className="card-group" key={project.id}>
                                <div className="card" >
                                  <div className="content">
                                    <h1>{project.title}</h1>
                                    <p>{project.description}</p>
                                    <h3>{project.use}</h3>
                                  </div>
                                  <div>

                                    <Link to={`/admin/project/edit/${project.id}`}>
                                      Edit
                                    </Link>
                                    <button onClick={() => handleHiddenItem(project)}>Hidden</button>
                                    <button>Delete</button>
                                  </div>
                                </div>
                              </div>

                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </APVContainer>
  )
}

export default AdminProjectsView;