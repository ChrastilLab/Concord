import React, {useEffect, useState} from "react";
import Header from "../components/Header"
import Sidenav from "../components/Sidenav"
import { Box, Flex } from "@chakra-ui/react"

import {
    useSession,
    useSupabaseClient,
    useSessionContext,
} from "@supabase/auth-helpers-react";

function Home() {

    const { isLoading } = useSessionContext();


    const session = useSession();

    if (isLoading) {
        return <></>;
    }

    return(
        <Flex flexDirection={'column'} height={'100vh'}>
            <Header/>
            {
                session ? (
                    <Box flex={1} display={'flex'} flexDirection={'row'} zIndex={1}>
                        <Sidenav/>
                        <Flex flex={1} >
                            hello
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

export default Home