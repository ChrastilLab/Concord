import React from "react";
import Header from "../components/Header";

import OrganizationCard from "../components/OrganizationCard";
import SideInfoBar from "../components/SideInfoBar";
import OrgSideNav from "../components/OrgSideNav";

import { useState, useEffect } from "react";

/* UI Libraries */
import { Box, Button, Center, Divider, Heading, Flex } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import {
  useSession,
  useSupabaseClient,
  //   useSessionContext,
} from "@supabase/auth-helpers-react";

const randomColors = [];
for (let i = 0; i < 7; i++) {
  randomColors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
}

function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [orgData, setOrgData] = useState([]);
  const [userCreatedOrgs, setUserCreatedOrgs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("Organizations")
        .select("organization_name, leader, description, lab_sheet");

      if (!error) {
        setOrgData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserCreatedOrgs = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("OrganizationCreators")
          .select("*")
          .eq("user_id", session.user.id);

        if (!error) {
          setUserCreatedOrgs(data.length);
        }

        setLoading(false);
      }
    };

    fetchUserCreatedOrgs();
  });

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
              {/* <Button
                variant={"ghost"}
                padding={"0px"}
                marginTop={"30px"}
                marginRight={"60px"}
                _hover={{ bg: "#D0EAF9" }}
              >
                <EllipsisVerticalIcon
                  style={{ height: "30px", width: "30px" }}
                />
              </Button> */}
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
                  color_scheme={randomColors[orgData.indexOf(org)]}
                  labSheetUrl={org.lab_sheet}
                />
              ))}
            </Flex>
          </Flex>
          <SideInfoBar
            numOrgs={orgData.length}
            userCreatedOrgs={userCreatedOrgs}
          ></SideInfoBar>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default Home;
