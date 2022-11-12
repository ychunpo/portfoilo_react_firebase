import React, { useEffect, useState } from "react";
import styled from "styled-components"
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../utils/firebase";

const FPIContainer = styled.div`

`


const ProjectItem = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Projects", id);
    onSnapshot(docRef, (snapshot) => {
      setProject({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);

  return (
    <FPIContainer>
      {project && (
        <div className="">

          <div className="">
            <h2>{project.title}</h2>
            <h4>{project.description}</h4>
            <h3>{project.tech}</h3>

          </div>

          <figure className="">
            <img
              src=""
              alt=""
            />
          </figure>
        </div>
      )}
    </FPIContainer>
  )
}

export default ProjectItem;