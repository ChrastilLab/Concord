import React from "react";

import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import MembersGrid from "../components/MembersGrid";
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

function Members() {
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

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          <Sidenav organization={organization}/>
          <Flex flex={1}>
            <MembersGrid />
          </Flex>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default Members;
