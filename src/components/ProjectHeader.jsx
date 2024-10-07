import {
  Card,
  CardBody,
  HStack,
  CardHeader,
  Heading,
  Flex,
  Image,
  Text,
  Stack,
} from "@chakra-ui/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditOrgForm from "./EditOrgForm";
import Check from "./img/Check.png";
import { GraphUpArrow } from "react-bootstrap-icons";
import { FolderOutlined } from "@ant-design/icons";
import CreateNewStudy from "./CreateNewStudy";
import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";

function ProjectHeader({ projects, organization_id, organization }) {
  const [numberDone, setNumberDone] = useState(0);
  const [numberInProgress, setNumberInProgress] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    let done = 0;
    let inProgress = 0;
    let total = 0;
    projects.map((project) => {
      if (project.status === "Data Analysis") {
        done++;
      } else if (project.status === "Data Collection") {
        inProgress++;
      }
      total++;
    });
    setNumberDone(done);
    setNumberInProgress(inProgress);
    setTotalProjects(total);
  }, [projects]);


  return (
    <Flex
      mt={"5vh"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      w={"138vh"}
      bg={"#F4F4F4"}
    >
      <Card
        direction={{ base: "column", sm: "row" }}
        borderRadius="md"
        h="25vh"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"
        p={2}
        bg="#F0F0F0"
      >
        <CardHeader
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack ml={"2vh"} mb={3} w="45vh" spacing={3} marginTop={"10px"}>
            <Heading size="lg">{organization.organization_name}</Heading>

            <Text marginTop={"-15px"} color={"#808080"}>
              Led By: {organization.leader ? organization.leader : "None"}
            </Text>

            <Text isTruncated>{organization.description}</Text>

            <CreateNewStudy projects={projects} />
          </Stack>
        </CardHeader>

        <CardBody ml="6vh" alignContent={"center"} p={2}>
          <HStack spacing={10}>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              bg={"#FFFDFD"}
              borderRadius="1vh"
              w="22vh"
              h="19vh"
            >
              <Stack mt={4} alignItems={"center"} justifyContent={"center"}>
                <GraphUpArrow size={"25px"}></GraphUpArrow>
                <Text fontWeight={"bold"}>Data Analysis</Text>
                <Text fontSize="30" fontWeight={"bold"}>
                  {numberDone}
                </Text>
              </Stack>
            </Flex>

            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              bg={"#FFFDFD"}
              borderRadius="1vh"
              w="22vh"
              h="19vh"
            >
              <Stack mt={4} alignItems={"center"} justifyContent={"center"}>
                <Image h={"4vh"} w={"4vh"} src={Check}></Image>
                <Text fontWeight={"bold"}>Data Collection</Text>
                <Text fontSize="30" fontWeight={"bold"}>
                  {numberInProgress}
                </Text>
              </Stack>
            </Flex>

            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              bg={"#FFFDFD"}
              borderRadius="1vh"
              w="22vh"
              h="19vh"
            >
              <Stack mt={4} alignItems={"center"} justifyContent={"center"}>
                <FolderOutlined style={{ fontSize: "4vh" }} />
                <Text fontWeight={"bold"}>Total Projects</Text>
                <Text fontSize="30" fontWeight={"bold"}>
                  {totalProjects}
                </Text>
              </Stack>
            </Flex>

            <Flex marginLeft={"-35px"} marginTop={"-162px"}>
              < EditOrgForm organization_id={organization_id}/>
            </Flex>
          </HStack>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default ProjectHeader;
