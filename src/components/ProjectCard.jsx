import {
  Box,
  Card,
  Badge,
  CardBody,
  HStack,
  CardHeader,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditProject from "./EditProject";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

function ProjectCard({ project, onProjectUpdate }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };

    return date.toLocaleDateString("en-US", options);
  }

  return (
    <Flex
      mt={"5vh"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      w={"40vh"}
      h="23vh"
      bg={"#F4F4F4"}
    >
      <Card
        borderRadius="md"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
        h="full"
        p={4}
        bg="#F0F0F0"
      >
        <CardHeader
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <HStack>
              <Heading size="md" mb={1} width={"160px"} isTruncated>
                {project.project_name}
              </Heading>
              <Badge
                bg={
                  project.status === "In Progress"
                    ? "#ff0000"
                    : project.status === "Completed"
                    ? "#48BB78"
                    : "#A0AEC0"
                }
                color="white"
                fontSize="small"
                fontWeight="none"
                display="flex"
                borderRadius={"0.5vh"}
                alignItems="center"
                paddingLeft={"1vh"}
                textTransform="none"
              >
                {project.status} <Box as="span" ml={1} className="bi bi-x" />
              </Badge>
            </HStack>
            <Text fontSize={"13px"} w={"270px"} isTruncated>
              Lead: {project.project_lead}
            </Text>
          </Box>
        </CardHeader>

        <CardBody p={2} fontSize={"14px"} h={"75%"}>
          <Text w="75%" textColor="#A39999" noOfLines={2}>
            {project.description}
          </Text>
          <HStack w="100%" marginTop={"10px"} gap={"70px"}>
            <Text isTruncated>
              Created on:{" "}
              <Text textColor="#A39999" as="span">
                {formatDate(project.created_at)}
              </Text>
            </Text>
            <Spacer />
            <EditProject 
            project={project}
            onProjectUpdate={onProjectUpdate}
          />
          </HStack>
        </CardBody>
        <Flex
          justifyContent={"flex-end"}
          marginTop={"-25px"}
          marginRight={"-4px"}
        >
          <PencilSquareIcon width={"20px"}></PencilSquareIcon>
        </Flex>
      </Card>
    </Flex>
  );
}

export default ProjectCard;
