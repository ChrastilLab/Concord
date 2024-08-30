import React from "react";
import { Text, Button, Flex, Stack } from "@chakra-ui/react";
import "./Login.css";
import { handleGoogleSignIn } from "../../config/supabase";

import Header from "../../components/Header";

function Login() {
  return (
    <>
      <Header />
      <Flex
        justifyContent="center"
        alignItems="flex-start"
        className="background"
      >
        <Flex
          alignItems="flex-start"
          width="80vh"
          height="100%"
          top="10vh"
          position="relative"
          paddingTop="5vh"
        >
          <Stack spacing={5} width="100%">
            <Text
              lineHeight={1.1}
              textAlign={"center"}
              fontWeight="bold"
              fontSize="5.5rem"
            >
              Your One Stop For Lab Productivity
            </Text>
            <Text
              fontSize="1.0rem"
              alignSelf="center"
              width="70%"
              textAlign={"center"}
            >
              Concord's all-in-one lab management platform offers enhanced
              collaboration, time-saving automation, and full project
              visibility.
            </Text>
            <Button
              onClick={handleGoogleSignIn}
              width="18vh"
              mt="3vh"
              color="white"
              backgroundColor="black"
              alignSelf={"center"}
            >
              Log In With Google
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
