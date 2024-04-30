import Navbar from "../../components/Navbar/Navbar";
import FramedBox from "../../components/FramedBox/FramedBox";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { testProjects } from "../../config/testData";

function ProjectDetails(props) {
  let { projectId } = useParams();

  function getProjectData(testData) {
    for (let i = 0; i < testData.length; i++) {
      if (testData[i].projectId == projectId) {
        return testData[i];
      }
    }
  }

  const projectData = getProjectData(testProjects);

  return (
    <>
      <Navbar navTitle={projectData.projectName} />
      <Box padding="20px" h="86vh">
        <Box w="100%" h="100%">
          <FramedBox
            title1="Project Details"
            title2={projectData.projectStatus}
          >
            <Flex direction="column" marginBottom="10px">
              <Text as="b" fontSize="lg">
                {projectData.startDate} - {projectData.endDate}
              </Text>
              <Text as="b" fontSize="lg">
                Project Lead: {projectData.projectLead}
              </Text>
            </Flex>
            <Flex h="100%">
              <Box w="49.5%" h="100%" bg="#eeeeee">
                <Text ml="10px" fontSize="xl" as="b">
                  {projectData.projectDescription}
                </Text>
              </Box>
              <Spacer />
              <Box w="49.5%" h="100%" bg="#eeeeee">
                <Text ml="10px" fontSize="xl" as="b">
                  Gantt Chart
                </Text>
              </Box>
            </Flex>
          </FramedBox>
        </Box>
      </Box>
    </>
  );
}

export default ProjectDetails;
