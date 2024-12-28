import React, { useEffect, useState } from "react";
import Projects from "../components/Projects";

import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import { Box, Flex } from "@chakra-ui/react";


import { useParams } from "react-router-dom";
import { supabase } from "../config/supabase";

import {
  useSession,
} from "@supabase/auth-helpers-react";

function Organization() {
  const { organization_id } = useParams();

  const session = useSession();

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



  const Organizations = supabase.channel('custom-update-channel')
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'Organizations' },
    (payload) => {
      if (
        payload.new.organization_id !== null &&
        payload.new.organization_id === organization_id
      ) {
        setOrganization(payload.new);
      }
    }
  )
  .subscribe();

  const [selectedComponent, setSelectedComponent] = useState("Projects");

  const renderComponent = () => {
    switch (selectedComponent) {
        case "Projects":
            return <Projects organization={organization}/>;
        case "Tasks":
            return <h1>Tasks</h1>;
        case "Members":
            return <h1>Members</h1>;
        case "Lab Sheet":
            return <h1>Lab Sheet</h1>
        default:
            return <h1>404: Component Not Found</h1>;
    }
  };

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          <Sidenav organization = {organization} onSelect={setSelectedComponent}/>
          <div>{renderComponent()}</div>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default Organization;
