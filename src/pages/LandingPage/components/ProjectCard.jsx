import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ProjectCard(props) {
  let projectTitle = props.projectTitle;
  let projectLeader = props.projectLeader;
  let projectId = props.projectId;

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/project/${projectId}`);
  }

  return (
    <>
      <Flex
        w="300px"
        h="300px"
        border="1px"
        borderRadius={10}
        overflow="hidden"
        direction="column"
        onClick={handleClick}
      >
        <Box h="20%" bg="cyan"></Box>
        <Spacer />
        <Box p={5}>
          <Text fontSize="2xl" as="b">
            {projectTitle}
          </Text>
          <Text fontSize="xl">{projectLeader}</Text>
        </Box>
      </Flex>
    </>
  );
}

export default ProjectCard;
