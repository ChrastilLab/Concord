import { Box, Flex, Spacer, Text } from "@chakra-ui/react";

function ProjectCard(props) {
  let projectTitle = props.projectTitle;
  let projectLeader = props.projectLeader;
  return (
    <>
      <Flex
        w="300px"
        h="300px"
        border="1px"
        borderRadius={10}
        overflow="hidden"
        direction="column"
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
