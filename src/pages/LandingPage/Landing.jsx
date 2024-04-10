import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProjectCard from "./components/ProjectCard";
import { Wrap, WrapItem, Box } from "@chakra-ui/react";
import testData from "../../config/testData";

function Landing() {
  // let projects = [
  //   { projectTitle: "Project 1", projectLeader: "Leader 1" },
  //   { projectTitle: "Project 2", projectLeader: "Leader 2" },
  //   { projectTitle: "Project 3", projectLeader: "Leader 3" },
  // ];

  let projects = testData;

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
