import {
    Box,
    Flex,
    IconButton,
    Button,
    Text,
    InputGroup,
    InputRightElement,
    Input,
    Spacer,
} from "@chakra-ui/react"

import { Search2Icon } from '@chakra-ui/icons'


import {
    useSession,
    useSupabaseClient,
} from "@supabase/auth-helpers-react";

import {handleGoogleSignIn} from "../config/supabase";
import React from "react";
import AccountPopup from "./AccountPopup";

function Header() {

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
            <Spacer/>
            <Box mr = {'15px'}>
                <InputGroup mt={'5px'} alignItems={'center'}>
                    <Input placeholder="Search this project..." borderRadius={'5px'} bg="white"/>
                    <InputRightElement>
                        <IconButton aria-label='Search database' icon={<Search2Icon/>} bg='white' size='sm' />
                    </InputRightElement>
                </InputGroup>
            </Box>
            <AccountPopup/>

        </Flex>
    )
}

export default Header
