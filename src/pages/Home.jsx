import React from "react";
import Header from "../components/Header";

import OrganizationCard from "../components/OrganizationCard";
import SideInfoBar from "../components/SideInfoBar";
import OrgSideNav from "../components/OrgSideNav";

import { useState, useEffect } from "react";

/* UI Libraries */
import { Box, Center, Divider, Heading, Flex } from "@chakra-ui/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import {
  useSession,
  useSupabaseClient,
  //   useSessionContext,
} from "@supabase/auth-helpers-react";

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
        .select(
          "organization_name, leader, description, lab_sheet, color_scheme"
        );

      if (!error) {
        data.sort((a, b) =>
          a.organization_name > b.organization_name ? 1 : -1
        );
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
        setOrgData((prevData) => {
          const index = prevData.findIndex(
            (org) => org.organization_name === payload.new.organization_name
          );
          if (index !== -1) {
            // update
            const updatedData = [...prevData];
            updatedData[index] = payload.new;
            return updatedData;
          } else {
            // insert new org
            return [...prevData, payload.new];
          }
        });
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
                  color_scheme={org.color_scheme}
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
