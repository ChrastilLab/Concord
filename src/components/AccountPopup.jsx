import React from 'react';
import { useNavigate } from "react-router-dom";
import { handleGoogleSignIn } from "../config/supabase";

import {
    Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Image, VStack,
    Box,Tooltip, Text, Checkbox, Divider, Avatar, AvatarBadge, Badge,
} from '@chakra-ui/react';

import {
    TimeIcon,
} from '@chakra-ui/icons';

import {
    useSession,
    useSupabaseClient,
} from "@supabase/auth-helpers-react";

import {
    BarChart,
    Bar,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from 'recharts';


const userData = {
    avatarImg: "https://avatars.githubusercontent.com/u/47913844?v=4",
    name: "Yukai Gu",
    email: "yukai1@uci.edu",
    status: "Programming...",
    role: "admin",
    description: "This is the description part. I am a student from UCI, working as a developer in this project.",
    lastActive: "April 23, 2024 at 12:00:00 AM UTC-7",
    hours: {
        firstWeek: 6,
        secondWeek: 3,
        thirdWeek: 7,
        fourthWeek: 6,
        fifthWeek: 10,
        sixthWeek: 8,
        seventhWeek: 7,
        eighthWeek: 10,
        ninthWeek: 7,
        tenthWeek: 8
    },
    tags: ["Developer", "Volunteer"],
    tasks: ["Task 1: Finish the personal information page", "Task 2: Looking into backend APIs", "Task 3: Implement the user profile"],
};

const CustomTooltip: React.FC<{ active?: boolean; payload?: any; label?: number }> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box bg="#caf0f8" p={2} borderRadius="5px" boxShadow="md" padding={"5px"} marginLeft={"15px"} marginRight={"15px"}>
                <Text fontWeight="bold" mb={1} color={"#0077b6"}>{"Week " + ( 1)}</Text>
                <Text color={"#0077b6"}>{`Hours: ${payload[0].value}h`}</Text>
            </Box>
        );
    }
    return null;
};


function AccountPopup() {
    const session = useSession();
    const navigate = useNavigate();
    const supabase = useSupabaseClient();

    async function signOut() {
        await supabase.auth.signOut().then(() => {
            navigate("/Login");
        });
    }

    const data = Object.entries(userData.hours).map(([week, hours]) => ({
        week: week.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase()),
        hours
    }));

    return (
        session ? (
            <Popover>
                <PopoverTrigger>
                    <Button background={"inherit"}>
                        <Image width={"40px"}
                               height={"40px"}
                               borderRadius={"100%"}
                               src={userData.avatarImg}
                               alt="Profile" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent backgroundColor={"#e3e5e7"}
                                borderRadius={"10px"}
                                overflow={"hidden"}
                                color={"black"}
                                right={"30px"}
                                height={"65vh"}
                                width={"30vw"}
                                minWidth={"300px"}>
                    <PopoverArrow />

                    <PopoverHeader fontWeight={"bold"}
                                   backgroundColor={"#4498ec"}
                                   padding={"10px"}
                                   height={"10vh"}
                                   width={"30vw"}
                                   minWidth={"300px"}>
                        <Tooltip label={session ? session.user.last_sign_in_at : ""}
                                 fontSize={"12px"}
                                 backgroundColor={"#d0f5d7"}
                                 color={"#2f533f"}
                                 padding={"5px"}
                                 borderRadius={"5px"}
                                 placement='left'>
                            <TimeIcon position={"absolute"}
                                      right={"0"}
                                      marginRight={"10px"}/>
                        </Tooltip>
                    </PopoverHeader>

                    <Avatar src={userData.avatarImg}
                            boxSize={"12vh"} position={"relative"} top={"-6vh"} left={"2vw"} border={"#e3e5e7 solid 7px"}>
                        <Tooltip hasArrow label={userData.status} placement='right' backgroundColor={"#d0f5d7"} color={"#2f533f"}>
                            <AvatarBadge boxSize={'1.5em'} bg='green.500' border={"#e3e5e7 solid 5px"} />
                        </Tooltip>
                    </Avatar>

                    <PopoverBody padding={"10px"}
                                 backgroundColor={"#e3e5e7"}
                                 width={"30vw"}
                                 height={"50vh"}
                                 minWidth={"300px"}>
                        <VStack position={"absolute"}
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
                                align={'stretch'}>
                            <Box>
                                <Text fontSize={"22px"}
                                      fontWeight={"bold"}
                                      color={"black"}
                                      left={"0"}
                                      lineHeight={"22px"}
                                      display={"inline-block"}
                                      verticalAlign={"middle"}>
                                    {userData.name}
                                </Text>
                                <Badge colorScheme={'green'}
                                       marginLeft={"20px"}
                                       borderRadius={"5px"}>
                                    {userData.role.toUpperCase()}
                                </Badge>
                                <Box fontSize={"12px"}
                                     color={"black"}
                                     left={"0"}>
                                    {session ? session.user.email : ""}
                                </Box>
                            </Box>
                            <Divider/>
                            <Box>
                                <Box fontSize={"12px"}
                                     color={"black"}>
                                    {userData.description}
                                </Box>
                            </Box>
                            <Divider/>
                            <VStack align="left">
                                <ResponsiveContainer width="100%" height={60}>
                                    <BarChart data={data}>
                                        <RechartsTooltip content={<CustomTooltip />} />
                                        <Bar dataKey="hours" fill="#4498ec" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </VStack>
                            <Divider/>
                            <VStack align="left">
                                {userData.tasks.map((task, index) => (
                                    <Checkbox key={index}
                                              backgroundColor={"#e3e5e7"}
                                              padding={"5px"}
                                              borderRadius={"5px"}
                                              marginTop={"5px"}>
                                        {task}
                                    </Checkbox>
                                ))}
                            </VStack>
                            <Box></Box>
                        </VStack>
                    </PopoverBody>
                    <Button variant={"solid"}
                            onClick={signOut}
                            bottom={"15px"}
                            width={"20%"}
                            left={"75%"}>
                        Log Out
                    </Button>
                </PopoverContent>
            </Popover>
        ) : (
            <Button bg='transparent' onClick={handleGoogleSignIn}>
                <box-icon size='lg' name='user-circle'></box-icon>
            </Button>
        )
    );
}

export default AccountPopup;