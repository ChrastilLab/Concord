import { auth, createUserWithEmailAndPassword } from "../../config/firebase";
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const toast = useToast();

  const handleSignupWithEmail = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      toast({
        title: "Signup Successful",
        description: "debug use only",
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      console.log(user);

      navigate("/");
    } catch (err) {
      console.error(err);

      let errorMessage = "An unknown error occurred.";

      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password should at least be 6 characters.";
      }

      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          marginBottom="2"
          justifyContent="center"
          alignItems="center"
        >
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                padding="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>

                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={handleSignupWithEmail}
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Alredy have an account?{" "}
          <Link color="teal.500" href="signup">
            Log in
          </Link>
        </Box>
      </Flex>
    </>
  );
};
