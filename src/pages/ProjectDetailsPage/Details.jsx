import Navbar from "../../components/Navbar/Navbar";
import FramedBox from "../../components/FramedBox/FramedBox";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

function ProjectDetails() {
  return (
    <>
      <Navbar navTitle="Project 1" />
      <Box padding="20px" h="86vh">
        <Box w="100%" h="100%">
          <FramedBox title1="Project Details" title2="Ongoing">
            <Flex h="100%">
              <Box w="49.5%" h="100%" bg="#eeeeee">
                <Text ml="10px" fontSize="xl" as="b">
                  Project Description
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
