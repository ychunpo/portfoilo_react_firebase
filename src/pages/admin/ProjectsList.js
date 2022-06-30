import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../utils/firebase";
import PanelNavbar from "../../components/admin/PanelNavbar";

const Container = styled.div`

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
      <PanelNavbar />
      <div>
        <Link to="/create-project" />
      </div>
      <div>
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
              <div className="" key={id}>
                <div className="">
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
            )
          ))
        }
      </div>
    </Container>
  )
}

export default ProjectsList;