import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { APVContainer } from "./styled/APVContainer";
import { auth, db } from "../../utils/firebase";

const AdminProjectsView = () => {
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [user] = useAuthState(auth);

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

  return (
    <APVContainer>
      <div className="admin-project-main">
        <div className="create-link">
          <Link to="/admin/project/create">Create</Link>
        </div>
        {allProjectsData.length === 0 ? (
          <p>No record found!</p>
        ) : (
          allProjectsData.map(
            ({
              id,
              project_number,
              title,
              description,
              tech,
              video,
              uiux,
              code,
              website,
              image,
            }
            ) => (
              <div className="card-group" key={id}>
                <div className="card" >
                  <div className="content">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <h3>{tech}</h3>
                  </div>
                  <div>
                    <Link to={`admin/project/create`}>
                      View
                    </Link>
                  </div>
                </div>
              </div>
            )
          ))
        }
      </div>
    </APVContainer>
  )
}

export default AdminProjectsView;