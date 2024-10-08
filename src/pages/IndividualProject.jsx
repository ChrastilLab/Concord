import React from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../config/supabase";
import IndividualProjectHeader from "../components/IndividualProjectHeader";
import IndividualProjectSidenav from "../components/IndividualProjectSidenav";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Card,
  CardBody,
  CardHeader,
  HStack,
  VStack,
  Text,
  Button,
  ButtonGroup,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ReactComponent as CheckEdit } from "../components/img/CkEdit.svg";
import { ReactComponent as Pin } from "../components/img/AiOutlinePushpin.svg";
import { ReactComponent as PinStar } from "../components/img/CkStar.svg";
import EditProject from "../components/EditProject";

import {
  useSession,
//   useSupabaseClient,
//   useSessionContext,
} from "@supabase/auth-helpers-react";

function IndividualProject() {
  const { organization_id, project_id } = useParams();
//   const { isLoading } = useSessionContext();

  const [project, setProject] = useState(null);
  const [project_edit, setProjectEdit] = useState(null);
  const [detail, setDetail] = useState("GOAL");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  function handleAspectClick(aspect) {
    setDetail(aspect);
  }

  function makePreviewURL(url) {
    const parts = url.split("/");
    let modified = "";
    for (let i = 0; i < 6; ++i) {
      modified += parts[i] + "/";
    }
    return modified + "preview";
  }

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("Projects")
        .select("*, ProjectPinnedDocs(*)")
        .eq("project_id", project_id);

      if (!error) {
        setProject(data[0]);
        const {ProjectPinnedDocs, ...rest} = data[0];
        setProjectEdit(rest);
      } else {
        console.error(error);
      }
    };

    fetchProject();
  }, [organization_id, project_id, refreshTrigger]);

  const session = useSession();

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <IndividualProjectHeader />
      {session && project && project_edit ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          <IndividualProjectSidenav
            organization_id={organization_id}
            project_id={project_id}
            project_name={project.project_name}
          />
          <Flex
            pl={"3.5%"}
            pt={"3%"}
            pr={"3.5%"}
            flex={1}
            flexDirection={"column"}
          >
            <Flex flex={1} flexDirection={"column"}>
              <HStack spacing={"3.5%"}>
                <Card
                  w={"40%"}
                  h="full"
                  borderRadius="20px"
                  boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                  p={2}
                  bg="#F0F0F0"
                >
                  <CardHeader
                    pt={2}
                    pb={0}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {/* <Button bg="#F0F0F0">
                      <CheckEdit />
                    </Button> */}
                    <EditProject project={project_edit} onProjectUpdate={triggerRefresh}/>
                  </CardHeader>
                  <CardBody
                    pl={"7%"}
                    pb={"12%"}
                    pt={0}
                    display="flex"
                    justifyContent="flex-start"
                  >
                    <VStack alignItems={"left"} spacing={3}>
                      <Text
                        fontSize={"180%"}
                        fontFamily={"Inter"}
                        fontStyle={"normal"}
                        fontWeight={600}
                        lineHeight={"100%"}
                      >
                        {project.project_name}
                      </Text>
                      <Text
                        color={"#565656"}
                        fontSize={"90%"}
                        fontFamily={"Inter"}
                        fontStyle={"normal"}
                        fontWeight={400}
                        lineHeight={"150%"}
                      >
                        Led By: {project.project_lead}
                      </Text>
                      <Text
                        fontSize={"95%"}
                        fontFamily={"Inter"}
                        fontStyle={"normal"}
                        fontWeight={700}
                        lineHeight={"100%"}
                      >
                        IRB Number: {project.irb_number}
                      </Text>
                      <Text
                        fontSize={"110%"}
                        fontFamily={"Inter"}
                        fontStyle={"normal"}
                        fontWeight={400}
                        lineHeight={"120%"}
                        pt={"5%"}
                      >
                        {project.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
                <Card
                  w={"54%"}
                  h="full"
                  borderRadius="20px"
                  boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
                  p={2}
                  bg="#F0F0F0"
                >
                  <CardHeader pt={"5%"} pb={"2%"}>
                    <ButtonGroup display="flex" justifyContent="space-between">
                      {["GOAL", "TESTING", "HYPOTHESIS", "EXPECTATIONS"].map(
                        (aspect) => (
                          <Button bg="#F0F0F0">
                            <Text
                              fontSize={"120%"}
                              fontFamily={"Inter"}
                              fontStyle={"normal"}
                              fontWeight={600}
                              textDecoration={
                                detail === aspect ? "underline" : ""
                              }
                              color={detail === aspect ? "#76CCFD" : "black"}
                              onClick={() => handleAspectClick(aspect)}
                            >
                              {aspect}
                            </Text>
                          </Button>
                        )
                      )}
                    </ButtonGroup>
                  </CardHeader>
                  <Divider width={"85%"} alignSelf={"center"} color="gray" />
                  <CardBody pt={"5%"} pl={"6%"} pr={"6%"} pb={"8%"}>
                    <Text
                      fontSize={"110%"}
                      fontFamily={"Inter"}
                      fontStyle={"normal"}
                      fontWeight={400}
                      lineHeight={"130%"}
                    >
                      {detail === "GOAL"
                        ? project.goal
                        : detail === "TESTING"
                        ? project.testing
                        : detail === "HYPOTHESIS"
                        ? project.hypothesis
                        : project.commitment}
                    </Text>
                  </CardBody>
                </Card>
              </HStack>
            </Flex>
            <Flex flex={1} pt={"5%"} flexDirection={"column"}>
              <HStack spacing={"1%"}>
                <Pin />
                <Text
                  fontSize={"120%"}
                  fontFamily={"Inter"}
                  fontStyle={"normal"}
                  fontWeight={400}
                >
                  Pinned Documents
                </Text>
              </HStack>
              <Divider width={"100%"} pt={"1.5%"} color="black" />
              <Grid
                templateColumns="repeat(4, 1fr)"
                gap={8}
                pt={"2%"}
                pb={"10%"}
                rowGap={120}
              >
                {project.ProjectPinnedDocs != null &&
                project.ProjectPinnedDocs.length > 0
                  ? project.ProjectPinnedDocs.map((doc) => (
                      <GridItem position="relative" cursor="pointer">
                        <iframe
                          title="document"
                          src={makePreviewURL(doc.document_url)}
                          width="100%"
                          height="100%"
                          style={{
                            transform: "scale(0.5)",
                            transformOrigin: "top left",
                            width: "200%",
                            height: "300%",
                            border: "none",
                          }}
                        ></iframe>
                        <div
                          onClick={() =>
                            window.open(doc.document_url, "_blank")
                          }
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "90%",
                            height: "120%",
                            backgroundColor: "rgba(0, 0, 0, 0)",
                            zIndex: 10,
                            title: "Click to open document",
                          }}
                        ></div>
                        <PinStar
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 20,
                            width: "10%",
                            height: "20%",
                            zIndex: 20,
                          }}
                        />
                      </GridItem>
                    ))
                  : null}
              </Grid>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default IndividualProject;
