import React from "react";
import { useParams } from 'react-router-dom';
import { supabase } from "../config/supabase";
import IndividualStudyHeader from "../components/IndividualStudyHeader";
import IndividualStudySidenav from "../components/IndividualStudySidenav"
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
            <IndividualStudyHeader />
            {
                session ? (
                    <Box flex={1} display={'flex'} flexDirection={'row'} zIndex={1}>
                      <IndividualStudySidenav organization={organization} project={project}/>
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