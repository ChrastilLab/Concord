import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGoogleSignIn } from "../config/supabase";

import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Image,
  VStack,
  Box,
  Tooltip,
  Text,
  Divider,
  Avatar,
  AvatarBadge,
  Badge,
} from "@chakra-ui/react";

import { TimeIcon } from "@chakra-ui/icons";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import {
  BarChart,
  Bar,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import EditAccountInfo from "./EditAccountInfo";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="#caf0f8"
        p={2}
        borderRadius="5px"
        boxShadow="md"
        padding={"5px"}
        marginLeft={"15px"}
        marginRight={"15px"}
      >
        <Text fontWeight="bold" mb={1} color={"#0077b6"}>{`Week ${
          label + 1
        }`}</Text>
        <Text color={"#0077b6"}>{`Hours: ${payload[0].value}h`}</Text>
      </Box>
    );
  }
  return null;
};

export let userData;

function AccountPopup() {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const [displayName, setDisplayName] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [userType, setUserType] = useState(
    localStorage.getItem("usertype") ? localStorage.getItem("usertype") : ""
  );
  const [bio, setBio] = useState(
    localStorage.getItem("userbio") ? localStorage.getItem("userbio") : ""
  );
  const [status, setStatus] = useState(
    localStorage.getItem("userstatus") ? localStorage.getItem("userstatus") : ""
  );

  const updateUserDataFromEdit = (newData) => {
    setDisplayName(newData.name);
    setBio(newData.bio);
    setStatus(newData.status);
  };

  const [hours, setHours] = useState([]);

  userData = {
    avatarImg: "",
    name: displayName,
    email: session ? session.user.email : "",
    status: status,
    userType: userType,
    description: bio,
    lastActive: session ? session.user.last_sign_in_at : "",
    hours: {
      // Hardcoded for now (Shows the hours worked by the user)
      firstWeek: hours[0] || 0,
      secondWeek: hours[1] || 0,
      thirdWeek: hours[2] || 0,
      fourthWeek: hours[3] || 0,
      fifthWeek: hours[4] || 0,
      sixthWeek: hours[5] || 0,
      seventhWeek: hours[6] || 0,
      eighthWeek: hours[7] || 0,
      ninthWeek: hours[8] || 0,
      tenthWeek: hours[9] || 0,
    },
  };

  useEffect(() => {
    async function fetchUserDisplayName() {
      if (session) {
        const { data: Users, error } = await supabase
          .from("Users")
          .select("*")
          .eq("user_id", session.user.id);

        if (error) {
          console.error("Error fetching display_name: ", error);
        } else {
          setDisplayName(Users[0].display_name);
          setUserType(Users[0].user_type);
          setBio(Users[0].bio);
          setStatus(Users[0].status);
          localStorage.setItem("username", Users[0].display_name);
          localStorage.setItem("usertype", Users[0].user_type);
          localStorage.setItem("userbio", Users[0].bio);
          localStorage.setItem("userstatus", Users[0].status);
        }
      }
    }
    fetchUserDisplayName();
  }, []);

  useEffect(() => {
    async function fetchCheckInData() {
      if (session) {
        const { data, error } = await supabase
          .from("CheckinResponses")
          .select("date, hours")
          .eq("user_id", session.user.id);

        if (!error) {
          if (hours.length === 0) {
            data.map((checkIn) => {
              let weekHours = 0;
              Object.values(checkIn.hours).forEach((task) => {
                weekHours += task.duration;
              });
              setHours((prevHours) => [...prevHours, weekHours]);
            });
          }
        }
      }
    }

    fetchCheckInData();
  }, [supabase, session]);

  async function signOut() {
    await supabase.auth.signOut().then(() => {
      navigate("/Login");
    });
  }

  const data = Object.entries(userData.hours).map(([week, hours]) => ({
    week: week
      .replace(/([A-Z])/g, " $1")
      .replace(/^\w/, (c) => c.toUpperCase()),
    hours,
  }));

  return session ? (
    <Popover>
      <PopoverTrigger>
        <Button background={"inherit"}>
          <Image
            width={"40px"}
            height={"40px"}
            borderRadius={"100%"}
            src={session.user.user_metadata.avatar_url}
            alt="Profile"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        backgroundColor={"#e3e5e7"}
        borderRadius={"10px"}
        overflow={"hidden"}
        color={"black"}
        right={"30px"}
        height={"65vh"}
        width={"30vw"}
        minWidth={"300px"}
      >
        <PopoverArrow />

        <PopoverHeader
          fontWeight={"bold"}
          backgroundColor={"#4498ec"}
          padding={"10px"}
          height={"10vh"}
          width={"30vw"}
          minWidth={"300px"}
        >
          <Tooltip
            label={session ? session.user.last_sign_in_at : ""}
            fontSize={"12px"}
            backgroundColor={"#d0f5d7"}
            color={"#2f533f"}
            padding={"5px"}
            borderRadius={"5px"}
            placement="left"
          >
            <TimeIcon
              position={"absolute"}
              left={"10px"}
              marginRight={"10px"}
              color={"white"}
            />
          </Tooltip>
        </PopoverHeader>

        <Avatar
          src={session.user.user_metadata.avatar_url}
          boxSize={"12vh"}
          position={"relative"}
          top={"-6vh"}
          left={"2vw"}
          border={"#e3e5e7 solid 7px"}
        >
          <Tooltip
            hasArrow
            label={userData.status}
            placement="right"
            backgroundColor={"#d0f5d7"}
            color={"#2f533f"}
          >
            <AvatarBadge
              boxSize={"1.5em"}
              bg="green.500"
              border={"#e3e5e7 solid 5px"}
            />
          </Tooltip>
        </Avatar>
        <EditAccountInfo updateUserDataFromEdit={updateUserDataFromEdit} />

        <PopoverBody
          padding={"10px"}
          backgroundColor={"#e3e5e7"}
          width={"30vw"}
          height={"50vh"}
          minWidth={"300px"}
        >
          <VStack
            position={"absolute"}
            width={"26vw"}
            minWidth={"270px"}
            height={"41vh"}
            backgroundColor={"#ffffff"}
            left={"2vw"}
            top={"16vh"}
            borderRadius={"10px"}
            paddingLeft={"15px"}
            paddingRight={"15px"}
            paddingTop={"10px"}
            overflowY={"scroll"}
            scroll
            spacing={4}
            align={"stretch"}
          >
            <Box>
              <Text
                fontSize={"22px"}
                fontWeight={"bold"}
                color={"black"}
                left={"0"}
                lineHeight={"22px"}
                display={"inline-block"}
                verticalAlign={"middle"}
              >
                {displayName}
              </Text>
              <Badge
                colorScheme={"green"}
                marginLeft={"20px"}
                borderRadius={"5px"}
              >
                {userData.userType ? "ADMIN" : "MEMBER"}
              </Badge>
              <Box fontSize={"12px"} color={"black"} left={"0"}>
                {userData.email}
              </Box>
            </Box>
            <Divider />
            <Box>
              <Box fontSize={"12px"} color={"black"}>
                {userData.description}
              </Box>
            </Box>
            <Divider />
            <VStack align="left">
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={data}>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey="hours" fill="#4498ec" />
                </BarChart>
              </ResponsiveContainer>
            </VStack>
            <Box></Box>
            <Button
              onClick={() =>
                userData.userType
                  ? navigate("/ra-summary")
                  : navigate("/personal-summary")
              }
              width={"40%"}
              backgroundColor={"white"}
              border={"black solid 1px"}
              borderRadius={"10px"}
              height={9}
            >
              My summary
            </Button>
            <Box></Box>
          </VStack>
        </PopoverBody>
        <Button
          variant={"solid"}
          onClick={signOut}
          bottom={"15px"}
          width={"20%"}
          left={"75%"}
        >
          Log Out
        </Button>
      </PopoverContent>
    </Popover>
  ) : (
    <Button bg="transparent" onClick={handleGoogleSignIn}>
      <box-icon size="lg" name="user-circle"></box-icon>
    </Button>
  );
}

export default AccountPopup;
