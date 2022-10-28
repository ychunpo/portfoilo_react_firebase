import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PortfolioMuiContainer from '@mui/material/Container';
import Slider from "react-slick";
import { db } from "../utils/firebase";
import ProjectCard from "./pages_components/ProjectCard";
import ProjectModel from './pages_components/ProjectModel';


const Portfolio = () => {
  const [allProjectsData, setAllProjectsData] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleModelOpen = () => {
    setOpen(true);
  }

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  }

  return (
    <PortfolioMuiContainer maxWidth="lg">
      <CssBaseline />
      <div>
        <h1>Self make projects</h1>
      </div>

      <Slider {...settings}>
        {
          allProjectsData.length === 0 ? (
            <p>Loading...</p>
          ) : (
            allProjectsData.map(
              ({
                id,
                rank,
                title,
                description,
                use,
                video,
                uiux,
                code,
                website,
                coverImage,
                coverCaption

              }
              ) => (
                <div className="card-group" key={id}>

                  <ProjectCard
                    title={title}
                    use={use}
                    description={description}
                    coverImage={coverImage}
                    coverCaption={coverCaption}
                    handleModelOpen={handleModelOpen}
                  />

                  <ProjectModel
                    title={title}
                    use={use}
                    description={description}
                    coverImage={coverImage}
                    coverCaption={coverCaption}
                    open={open}
                    setOpen={setOpen}
                  />
                </div>
              )
            ))
        }
      </Slider>

    </PortfolioMuiContainer>
  )
}

export default Portfolio;