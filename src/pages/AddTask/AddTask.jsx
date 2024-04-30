import {
  Text,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Spacer,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { React, useState } from "react";
import { SelectableInput } from "../../components/SelectableInput/SelectableInput";
import { TimePicker } from "../../components/TimePicker/TimePicker";

export const AddTask = () => {
  const [assignedRA, setAssignedRA] = useState("");
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const testList = [
    "",
    "Hello",
    "Test",
    "Select",
    "List",
    "RA 1",
    "RA 2",
    "RA 3",
    "RA 4",
    "abc",
    "abcd",
    "abcde",
    "abcdef",
    "abcdefg",
  ];
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
              <SelectableInput list={testList}></SelectableInput>
              <Box
                border="1px"
                borderRadius={6}
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                overflow="hidden"
                paddingLeft="0.7rem"
                paddingTop="0.35rem"
                paddingBottom="0.35rem"
                minHeight="2rem"
              >
                <input
                  type="date"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                ></input>
              </Box>
              <Flex alignItems="center" justifyContent="space-between">
                <Box w="45%">
                  <TimePicker label="Start" />
                </Box>
                <Box w="45%">
                  <TimePicker label="End" />
                </Box>
              </Flex>

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={(e) => {
                  e.preventDefault();
                }}
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
