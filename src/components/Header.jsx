import {
    Box,
    Flex,
    Button
} from "@chakra-ui/react"

import {
    useSession,
    useSupabaseClient,
} from "@supabase/auth-helpers-react";

import {handleGoogleSignIn} from "../config/supabase";
import React from "react";
import { useNavigate } from "react-router-dom";
function Header() {

    const navigate = useNavigate();
    const session = useSession();
    const supabase = useSupabaseClient();
    async function signOut() {
        await supabase.auth.signOut().then(() => {
            navigate("/");
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
                Logo
            </Box>
            {
                session ? (
                    <Button variant={"solid"} onClick={signOut}>
                        Logout
                    </Button>
                ) : (
                    <Button variant={"solid"} onClick={handleGoogleSignIn}>
                        Login
                    </Button>
                )
            }

        </Flex>
    )
}

export default Header
