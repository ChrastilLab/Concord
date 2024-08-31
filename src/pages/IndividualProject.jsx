import React from "react";
import { useParams } from 'react-router-dom';
import { supabase } from "../config/supabase";
import IndividualProjectHeader from "../components/IndividualProjectHeader";
import IndividualProjectSidenav from "../components/IndividualProjectSidenav"
import { Box, Grid, GridItem, Flex } from "@chakra-ui/react"
import { useState, useEffect } from 'react';

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";


function IndividualProject() {

  const { organization, project } = useParams();
  const { isLoading } = useSessionContext();

  const session = useSession();

  return(
        <Flex flexDirection={'column'} height={'100vh'}>
            <IndividualProjectHeader />
            {
                session ? (
                    <Box flex={1} display={'flex'} flexDirection={'row'} zIndex={1}>
                      <IndividualProjectSidenav organization={organization} project={project}/>
                    </Box>
                ) : (
                    <div>
                        Not logged in
                    </div>
                )
            }
        </Flex>
    )
}


export default IndividualProject;