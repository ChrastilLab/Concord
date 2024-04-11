import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import ProjectDetails from "./components/ProjectDetails";
import ProjectDocuments from "./components/ProjectDocuments";
import Tasks from "./components/Tasks";
import TeamMembers from "./components/TeamMembers";
import Navbar from "../../components/Navbar/Navbar";

function Project() {
  let { projectId } = useParams();
  // console.log(projectId);
  const navigate = useNavigate();

  function goToDetails() {
    navigate(`/project/${projectId}/details`);
  }

  return (
    <>
      <Navbar navTitle="Project 1" />
      <Box padding="20px" h="85vh">
        <Flex w="100%" h="100%">
          <Flex direction="column" flex={1} mr="10px" h="100%" w="100%">
            <Box paddingBottom="20px" h="50%" w="100%">
              <TeamMembers />
            </Box>
            <Box h="50%">
              <Tasks />
            </Box>
          </Flex>
          <Flex direction="column" flex={1} ml="10px" h="100%">
            <Box h="20%">
              <ProjectDetails navigateDetails={goToDetails} />
            </Box>
            <Flex justifyContent="center" alignItems="center" h="10%">
              <Button w="100%" size="sm" bg="#bbbbbb">
                Slack Channel
              </Button>
            </Flex>
            <Box h="70%">
              <ProjectDocuments />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Project;
