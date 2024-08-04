import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import OrganizationCard from "../components/OrganizationCard";
import SideInfoBar from "../components/SideInfoBar";
import OrgSideNav from "../components/OrgSideNav";

/* UI Libraries */
import { Box, Button, Center, Divider, Heading, Flex } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

const dummy = [
  {
    name: "SNL",
    description: "Science lab for brain stuff that anteaters...",
    color_scheme: "#708090",
  },
  {
    name: "Concord...",
    description: "Science lab for brain stuff that anteaters...",
    color_scheme: "#A52A2A",
  },
  {
    name: "Database Query Booster and me",
    description: "Science lab for brain stuff that anteaters...",
    color_scheme: "#8FBC8F",
  },
];

function Home() {
  const { isLoading } = useSessionContext();
  const session = useSession();

  // if (isLoading) {
  //     return <></>;
  // }

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          {/* <Sidenav /> */}
          <OrgSideNav organizations={dummy}></OrgSideNav>
          <Flex flex={1} flexDirection={"column"}>
            <Flex flexDir={"row"} justifyContent={"space-between"}>
              <Heading marginLeft={"60px"} marginTop={"30px"}>
                Dashboard
              </Heading>
              <Button
                variant={"ghost"}
                padding={"0px"}
                marginTop={"30px"}
                marginRight={"60px"}
                _hover={{ bg: "#D0EAF9" }}
              >
                <EllipsisVerticalIcon
                  style={{ height: "30px", width: "30px" }}
                />
              </Button>
            </Flex>
            <Center>
              <Divider
                orientation="horizontal"
                width={"90%"}
                marginTop={"20px"}
                bgColor={"DFE5EB"}
              />
            </Center>
            <Flex flexDir={"row"} justify={"center"} gap={"40px"}>
              {dummy.map((org) => (
                <OrganizationCard
                  organization={org.name}
                  description={org.description}
                  color_scheme={org.color_scheme}
                />
              ))}
            </Flex>
          </Flex>
          <SideInfoBar numOrgs={dummy.length}></SideInfoBar>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default Home;
