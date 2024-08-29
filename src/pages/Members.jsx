import React from "react";

import Header from "../components/Header"
import Sidenav from "../components/Sidenav"
import MembersGrid from "../components/MembersGrid"
import { Box, Flex } from "@chakra-ui/react"
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import {
    useSession,
    // useSupabaseClient,
    // useSessionContext,
} from "@supabase/auth-helpers-react";


function Members() {
    // const { isLoading } = useSessionContext();
    const session = useSession();


    return(
        <Flex flexDirection={'column'} height={'100vh'}>
            <Header />
            {
                session ? (
                    <Box flex={1} display={'flex'} flexDirection={'row'} zIndex={1}>
                        <Sidenav />
                        <Flex  flex={1}>
                         <MembersGrid />
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

export default Members
