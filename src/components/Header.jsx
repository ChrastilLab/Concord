import {
    Box,
    Flex,
    Button,
    Text,
} from "@chakra-ui/react"

import {
    useSession,
    useSupabaseClient,
    useSessionContext,
} from "@supabase/auth-helpers-react";

import {handleGoogleSignIn} from "../config/supabase";
import React from "react";
import { useNavigate } from "react-router-dom";
import 'boxicons';

function Header() {

    const navigate = useNavigate();
    const session = useSession();
    const supabase = useSupabaseClient();
    async function signOut() {
        await supabase.auth.signOut().then(() => {
            navigate("/Login");
        });
    }

    return(
        <Flex alignItems={'center'}
              justifyContent={'space-between'}
              w={'100%'} h={'70px'}
              bg={'#E9E9E9'}
              boxShadow={'md'}
              padding={'20px'}
              zIndex={5}>
            <Box>
                <Text fontWeight='bold' fontSize='1.8rem'>Logo</Text>
            </Box>
            {
                session ? (
                    <Button variant={"solid"} onClick={signOut}>
                        Logout
                    </Button>
                ) : (
                    <Button bg='transparent' onClick={handleGoogleSignIn}>
                        <box-icon size='lg' name='user-circle'></box-icon>
                    </Button>
                )
            }

        </Flex>
    )
}

export default Header
