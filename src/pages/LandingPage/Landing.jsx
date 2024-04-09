import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Wrap, WrapItem, Box } from "@chakra-ui/react";

function Landing() {
  let projects = [
    { projectTitle: "Project 1", projectLeader: "Leader 1" },
    { projectTitle: "Project 2", projectLeader: "Leader 2" },
    { projectTitle: "Project 3", projectLeader: "Leader 3" },
  ];

  return (
    <div>
      <Navbar navTitle="Test Organization" />
      <Box margin="20px">
        <Wrap spacing="30px">
          {projects.map((project, index) => (
            <WrapItem key={index}>
              <ProjectCard
                projectTitle={project.projectTitle}
                projectLeader={project.projectLeader}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </div>
  );
}

export default Landing;
