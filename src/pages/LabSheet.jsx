import React from "react";

import Header from "../components/Header"
import Sidenav from "../components/Sidenav"
import { Box, Flex } from "@chakra-ui/react"
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import {
    useSession,
    // useSupabaseClient,
    // useSessionContext,
} from "@supabase/auth-helpers-react";

function LabSheets() {
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
                            <iframe title="google-drive" src="https://docs.google.com/spreadsheets/d/1THQEaNsabXZnvB9sTpF6Lo37ZuAEjvl8UXjIUk4za00/edit?gid=0#gid=0" width="100%" height="100%" ></iframe>
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

export default LabSheets
