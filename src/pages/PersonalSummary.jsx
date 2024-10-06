import React from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import CheckInForm from "../components/CheckInForm";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Heading,
  Spacer,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";

import { AddIcon } from "@chakra-ui/icons";

function PersonalSummary() {
  const session = useSession();
  const tag = [
    ["Admin", "blue"],
    ["Organization", "green"],
    ["Project-Two", "purple"],
    ["Organization-One", "pink"],
  ];
  const date = new Date();
  const tasks = [
    "Task 1: Finish the personal information page",
    "Task 2: Looking into backend APIs",
    "Task 3: Implement the user profile",
    "Task 4: do something",
    "Task 5: do something again",
  ];
  const hours = [10, 20, 13, 15, 17, 23, 19, 10, 20, 19];
  const userName = localStorage.getItem("username");

  function getNumberSuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          <Sidenav />
          <Box width="98%" marginLeft="1%" marginRight="1%" p={10}>
            <Flex flexDirection={"column"}>
              <Heading fontSize="3.2rem" mb={4}>
                {userName}
              </Heading>
              <Flex flexDirection={"row"}>
                {tag.map(([name, color]) => (
                  <Tag
                    key={name}
                    borderRadius="5px"
                    variant="solid"
                    colorScheme={color}
                    marginRight={5}
                    padding={1}
                    paddingLeft={2}
                    paddingRight={2}
                  >
                    <TagLabel>{name}</TagLabel>
                    <TagCloseButton />
                  </Tag>
                ))}
              </Flex>
              <Flex flexDirection={"row"} marginTop={10}>
                <Card
                  backgroundColor={"#F4F4F4"}
                  width={"40%"}
                  height={"30vh"}
                  marginRight={"5%"}
                >
                  <Flex flexDirection={"row"} width={"100%"}>
                    <Box>
                      <Text
                        marginTop={3}
                        marginLeft={4}
                        fontWeight={"bold"}
                        fontSize={18}
                      >
                        {date.toLocaleString("en-US", { month: "long" })}{" "}
                        {date.getDate()}
                        {getNumberSuffix(date.getDate())}
                      </Text>
                      <Text
                        marginLeft={4}
                        fontSize={12}
                        color={"grey"}
                        marginBottom={5}
                      >
                        {date.toLocaleString("en-US", { weekday: "long" })}
                      </Text>
                    </Box>
                    <Spacer />
                    <Text margin={5}>{tasks.length} Tasks</Text>
                  </Flex>
                  <Divider />
                  <AddIcon
                    boxSize={6}
                    backgroundColor={"lightgreen"}
                    borderRadius={"100%"}
                    padding={3}
                    position={"absolute"}
                    top={"23%"}
                    right={"7%"}
                    width={10}
                    height={10}
                  />
                  <VStack align="left" marginTop={5} overflowY={"scroll"}>
                    {tasks.map((task, index) => (
                      <Box>
                        <Checkbox
                          key={index}
                          padding={"2px"}
                          borderRadius={"5px"}
                          paddingLeft={"15px"}
                          marginTop={"5px"}
                        >
                          <Text marginLeft={5}>{task}</Text>
                        </Checkbox>
                      </Box>
                    ))}
                    <Box></Box>
                  </VStack>
                </Card>
                <Card backgroundColor={"#F4F4F4"} width={"55%"} height={"30vh"}>
                  <Text
                    margin={3}
                    marginLeft={4}
                    fontWeight={"bold"}
                    fontSize={18}
                  >
                    {date.toLocaleString("en-US", { month: "long" })} Scheduled
                    Sessions
                  </Text>
                </Card>
              </Flex>
              <Flex flexDirection={"row"} marginTop={10}>
                <Card
                  backgroundColor={"#F4F4F4"}
                  width={"40%"}
                  height={"30vh"}
                  marginRight={"5%"}
                  overflowY={"scroll"}
                >
                  <Text
                    margin={3}
                    marginLeft={4}
                    fontWeight={"bold"}
                    fontSize={18}
                  >
                    Notes
                  </Text>
                  <Text margin={2} marginLeft={4}>
                    This is a placeholder for the notes card. It will be used to
                    display any notes the user have.
                  </Text>
                </Card>
                <Flex flexDirection={"column"} width={"55%"}>
                  <Card backgroundColor={"#F4F4F4"} height={"20vh"}>
                    <Text
                      margin={3}
                      marginLeft={4}
                      fontWeight={"bold"}
                      fontSize={18}
                    >
                      Hours
                    </Text>
                    <Divider />
                    <Flex
                      flexDirection={"row"}
                      width={"100%"}
                      height={"100%"}
                      alignItems={"center"}
                      flexWrap={"wrap"}
                      overflowY={"scroll"}
                    >
                      {hours.map((hours, index) => (
                        <Flex
                          width={"33%"}
                          flexDirection={"row"}
                          justifyContent={"space-evenly"}
                        >
                          <Text>
                            <Text
                              display={"inline"}
                              fontWeight={"bold"}
                              fontSize={25}
                            >
                              Wk{index + 1}:
                            </Text>
                            <Text
                              display={"inline"}
                              marginLeft={2}
                              fontSize={25}
                            >
                              {hours}
                            </Text>
                            <Text display={"inline"} marginLeft={1}>
                              h
                            </Text>
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Card>
                  <Flex flexDirection={"row"} height={"10vh"} width={"100%"}>
                    <CheckInForm />
                    <Spacer />
                    <Button
                      height={"60%"}
                      top={"40%"}
                      width={"20%"}
                      fontSize={20}
                      color={"#5086ca"}
                    >
                      T2W
                    </Button>
                    <Spacer />
                    <Button
                      height={"60%"}
                      top={"40%"}
                      width={"30%"}
                      fontSize={20}
                      color={"#5086ca"}
                    >
                      When2meet
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default PersonalSummary;
