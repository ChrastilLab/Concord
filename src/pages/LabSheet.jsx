import React from "react";

import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import { Box, Flex } from "@chakra-ui/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { supabase } from "../config/supabase";
import { useEffect, useState } from "react";

import {
  useSession,
  // useSupabaseClient,
  // useSessionContext,
} from "@supabase/auth-helpers-react";

function LabSheets() {
  // const { isLoading } = useSessionContext();
  const session = useSession();

  const organization_id = useParams().organization_id;

  const [organization, setOrganization] = useState("");

  useEffect(() => {
    const fetchOrganization = async () => {
      const { data, error } = await supabase
        .from("Organizations")
        .select("*")
        .eq("organization_id", organization_id);

      if (!error) {
        setOrganization(data[0]);
      }
    };

    fetchOrganization();
  }, [organization_id]);

  // if (isLoading) {
  //     return <></>;
  // }

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          <Sidenav organization={organization}/>
          <Flex flex={1} flexDirection={"column"} alignItems="center">
            <iframe
              title="google-drive"
              src="https://docs.google.com/spreadsheets/d/1THQEaNsabXZnvB9sTpF6Lo37ZuAEjvl8UXjIUk4za00/edit?gid=0#gid=0"
              width="100%"
              height="100%"
            ></iframe>
          </Flex>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default LabSheets;
