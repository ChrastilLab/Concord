import React, { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectHeader from "../components/ProjectHeader";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import { Box, Grid, GridItem, Flex } from "@chakra-ui/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { supabase } from "../config/supabase";

import {
  useSession,
  // useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

function Studies() {
  const { organization } = useParams();
//   const { isLoading } = useSessionContext();

  const session = useSession();

  const [projects, setProjects] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function filterProjects(projects) {
    let wantedProjects = [];
    projects.map((project) => {
      if (
        project.Organizations !== null &&
        project.Organizations.organization_name === organization
      ) {
        wantedProjects.push(project);
      }
    });
    return wantedProjects;
  }

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("Projects")
        .select("*, Organizations(organization_id, organization_name)");

      if (error) {
        console.error(error);
        return;
      }
      setProjects(filterProjects(data));
    };

    fetchProjects();
  }, [organization, refreshTrigger]);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const New_projects_created = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "Projects" },
      (payload) => {
        if (
          payload.new.organization_id !== null &&
          payload.new.organization_id ===
            projects[0].Organizations.organization_id
        ) {
          setProjects((prevData) => [...prevData, payload.new]);
        }
      }
    )
    .subscribe();

  // if (isLoading) {
  //     return <></>;
  // }
  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          <Sidenav />
          <Flex flex={1} flexDirection={"column"} alignItems="center">
            <Box width="100%" px="68px">
              <ProjectHeader projects={projects} />
            </Box>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={1}
              width="100%"
              px="68px"
            >
              {/* {[...Array(6)].map((_, index) => (
                                    <GridItem key={index}>
                                        <ProjectCard />
                                    </GridItem>
                                ))} */}
              {projects.map((project) => (
                <GridItem key={project.project_id}>
                  <ProjectCard project={project} onProjectUpdate={triggerRefresh} />
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default Studies;
