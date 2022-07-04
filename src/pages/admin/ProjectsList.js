import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import PanelNavbar from "../../components/admin/PanelNavbar";

const Container = styled.div`
text-align: center;

.create-link {
  margin: 5px 20px;
  padding: 10px;
  font-size: 2rem;
  text-decoration: none;  
  display: flex;
  justify-content: right;  
}

.main {
  display: flex;
}

.card-group {
  margin: 5px;
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  margin: 10px;
  padding: 10px;
  border: 2px solid red;
  
}
`

const ProjectsList = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const projectRef = collection(db, "Projects");
    // console.log(projectRef);
    const allData = query(projectRef);
    onSnapshot(allData, (snapshot) => {
      const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProjects(projects);
    });
  }, []);

  return (
    <Container>
      {!user ? (
        <>
          <h2>
            <Link to="/auth">Login to create data!</Link>
          </h2>
        </>
      ) : (
        <>
          <PanelNavbar />

          <div className="create-link">
            <Link to="/create-project">Create</Link>
          </div>
          <div className="main">
            {allProjects.length === 0 ? (
              <p>No record found!</p>
            ) : (
              allProjects.map(
                ({
                  id,
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
                        <Link to={`/project/${id}`}>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              ))
            }
          </div>
        </>
      )}
    </Container>
  )
}

export default ProjectsList;