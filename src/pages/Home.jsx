import React from "react";
import Header from "../components/Header"
import Sidenav from "../components/Sidenav"
import OrganizationCard from "../components/OrganizationCard";

/* UI Libraries */
import { Box, Button, Center, Divider, Heading, Flex } from "@chakra-ui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import {
    useSession,
    // useSessionContext,
} from "@supabase/auth-helpers-react";

function Home() {
    // const { isLoading } = useSessionContext();
    const session = useSession();

    // if (isLoading) {
    //     return <></>;
    // }

    return(
        <Flex flexDirection={'column'} height={'100vh'}>
            <Header/>
            {
                session ? (
                    <Box flex={1} display={'flex'} flexDirection={'row'} zIndex={1}>
                        <Sidenav/>
                        <Flex flex={1} flexDirection={'column'}>
                            <Flex flexDir={"row"} justifyContent={"space-between"}>
                                <Heading marginLeft={'50px'} marginTop={'25px'}> Dashboard </Heading>
                                <Button variant={'ghost'} padding={"0px"} marginTop={"25px"} marginRight={"60px"} _hover={{ bg: "#D0EAF9"}}>
                                    <EllipsisVerticalIcon style={{height: "30px", width: "30px" }} />
                                </Button>
                            </Flex>
                            <Center><Divider orientation='horizontal' width={"90%"} marginTop={"38px"} bgColor={"DFE5EB"}/></Center>
                            <Flex flexDir={"row"} marginLeft={"68px"} justify={"space-between"} marginRight={"60px"}>
                                <OrganizationCard/>
                                <OrganizationCard/>
                                <OrganizationCard/>
                            </Flex>
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
