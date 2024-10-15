import React, {useEffect, useState} from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Heading, Image,
  Spacer,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import {useSearchParams} from "react-router-dom"
import { supabase } from "../config/supabase";

import { AddIcon } from "@chakra-ui/icons";

function BioSummary() {
  const [searchParams,setSearchParams] = useSearchParams();
  const [member,setMember] = useState({});
  const username = searchParams.get("username");
  const id = searchParams.get("id");

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

  async function getMember(id) {
    if (session) {
      const data = {};
      const {data: Users, error} = await supabase
          .from("Users")
          .select("*")
          .eq("user_id", id);
        if (!error){
          setMember(data[0])

      }
    }
  }

  useEffect(()=> {
    console.log("id:", id);
    const fetchMember = async () => {
      if (session) {
        const {data, error} = await supabase
            .from("Users")
            .select("*")
            .eq("user_id", id);
        if (!error) {
          console.log("member", data);
          setMember(data[0])

        }

      }
    }
    fetchMember();
  },[id, session]);

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
              <Divider marginTop={10}/>

              <Flex flexDirection={"row"} marginTop={10}>
                <Flex flexDirection={"column"}>
                  <Image src={member.url} width={400} height={300} />

                  <Box marginTop="2%">
                    <Text>{member.display_name}</Text>
                    <Text>{member.profession}</Text>
                  </Box>



                </Flex>
                <Box marginLeft="1%" marginRight="1%">
                  <Text>{member.bio}</Text>
{/*                <Text>If they click on other members page, create this new page to show it. All data for the member is available in the*/}
{/*database. Make the requests to database necessary.</Text>*/}
                  </Box>
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

export default BioSummary;

