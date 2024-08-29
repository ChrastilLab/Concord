
import React from "react";
import Header from "../components/Header"
import Sidenav from "../components/Sidenav"

import OrganizationCard from "../components/OrganizationCard";
import SideInfoBar from "../components/SideInfoBar";
import OrgSideNav from "../components/OrgSideNav";

import { useState, useEffect } from 'react';

/* UI Libraries */
import { Box, Button, Center, Divider, Heading, Flex } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

import { supabase } from "../config/supabase";

const default_color_scheme = "#708090";

function Home() {
  const { isLoading } = useSessionContext();
  const session = useSession();

  // if (isLoading) {
  //     return <></>;
  // }

  const [orgData, setOrgData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("Organizations")
        .select("organization_name, leader, description");

      if (!error) {
        setOrgData(data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const subscription = supabase
    .channel("table_db_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Organizations",
      },
      (payload) => {
        setOrgData((prevData) => [...prevData, payload.new]);
      }

    )
    .subscribe();

  if (loading) return <div>Loading...</div>;

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          {/* <Sidenav /> */}
          <OrgSideNav organizations={orgData}></OrgSideNav>
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
            <Flex
              flexDir={"row"}
              gap={"35px"}
              flexWrap={"wrap"}
              marginTop={"40px"}
              marginLeft={"60px"}
            >
              {orgData.map((org) => (
                <OrganizationCard
                  organization={org.organization_name}
                  description={org.description}
                  color_scheme={default_color_scheme}
                />
              ))}
            </Flex>
          </Flex>
          <SideInfoBar numOrgs={orgData.length}></SideInfoBar>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default Home;
