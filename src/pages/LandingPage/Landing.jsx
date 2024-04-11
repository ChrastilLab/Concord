import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProjectCard from "./components/ProjectCard";
import { Wrap, WrapItem, Box } from "@chakra-ui/react";
import { testProjects } from "../../config/testData";

function Landing() {
  let projects = testProjects;
  console.log(projects);

  return (
    <div>
      <Navbar navTitle="Test Organization" />
      <Box margin="20px">
        <Wrap spacing="30px">
          {projects.map((project, index) => (
            <WrapItem key={index}>
              <ProjectCard
                projectTitle={project.projectName}
                projectLeader={project.projectLead}
                projectId={project.projectId}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </div>
  );
}

export default Landing;
