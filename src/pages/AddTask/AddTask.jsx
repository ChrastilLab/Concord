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

import { React, useState } from "react";

import { SelectableInput } from "../../components/SelectableInput/SelectableInput";

export const AddTask = () => {
  const [assignedRA, setAssignedRA] = useState("");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  // tags

  return (
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
              flexDir="column"
            >
              <Input
                type="text"
                placeholder="Task Name"
                onChange={(e) => setTaskName(e.target.value)}
              />
              <SelectableInput></SelectableInput>

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                // onClick={pass}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
