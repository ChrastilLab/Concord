import React from "react";
import ProjectCard from "../components/ProjectCard"
import ProjectHeader from "../components/ProjectHeader";
import Header from "../components/Header"
import Sidenav from "../components/Sidenav" 
import { Box, Grid, GridItem, Flex } from "@chakra-ui/react"
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import {
    useSession,
    // useSupabaseClient,
    // useSessionContext,
} from "@supabase/auth-helpers-react";

function Studies() {
    // const { isLoading } = useSessionContext();
    const session = useSession();

    // if (isLoading) {
    //     return <></>;
    // }

    return(
        <Flex flexDirection={'column'} height={'100vh'}>
            <Header />
            {
                session ? (
                    <Box flex={1} display={'flex'} flexDirection={'row'} zIndex={1}>
                        <Sidenav />
                        <Flex  flex={1} flexDirection={'column'} alignItems="center">
                            <Box width='100%' px="68px" >
                                <ProjectHeader />
                            </Box>
                            <Grid
                                templateColumns="repeat(3, 1fr)"
                                gap={1}
                                width="100%"
                                px="68px"
                            >
                                {[...Array(6)].map((_, index) => (
                                    <GridItem key={index}>
                                        <ProjectCard />
                                    </GridItem>
                                ))}
                            </Grid>
                        </Flex>
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

export default Studies
