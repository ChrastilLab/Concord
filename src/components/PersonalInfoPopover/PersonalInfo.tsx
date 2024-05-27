import React from 'react';
import {
    Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Image, VStack,
    Box,StackDivider,Tooltip, Text, Checkbox, CheckboxGroup
} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip as RechartsTooltip , ResponsiveContainer } from 'recharts';
import "./PersonalInfo.css";
import * as PropTypes from "prop-types";


interface User {
    avatarImg: string;
    name: string;
    email: string;
    status: string;
    role: string;
    description: string;
    lastActive: string;
    hours: Record<string, number>;
    tags: string[];
    tasks: string[];
}

// Example Props Data (you should pass real data as props in your app)
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
            <Box bg="#d0f5d7" p={2} borderRadius="5px" boxShadow="md" padding={"5px"}>
                <Text fontWeight="bold" mb={1} color={"#2f533f"}>{"Week " + ( 1)}</Text>
                <Text color={"#2f533f"}>{`Hours: ${payload[0].value}h`}</Text>
            </Box>
        );
    }
    return null;
};

interface UserInfoPopoverProps {
    user?: User;
}

const UserInfoPopover: React.FC<UserInfoPopoverProps> = ({ user = userData }) => {
    const data = Object.entries(user.hours).map(([week, hours]) => ({
        week: week.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase()),
        hours
    }));

    return (
        <Popover>
            <PopoverTrigger>
                <Button>
                    <Image className={"triggerImage"} src={user.avatarImg} alt="Profile" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className={"personalContent"}>
                <PopoverArrow />

                <PopoverHeader className={"contentHeader"}>
                    <Tooltip label={"Recent: " + user.lastActive} className={"lastActiveTooltip"} placement='left'>
                        <TimeIcon className={"lastActiveIcon"} />
                    </Tooltip>
                </PopoverHeader>

                <img className={"contentAvatar"} src={user.avatarImg} alt="Profile" />
                <Tooltip hasArrow label={user.status} className={"statusTooltip"} placement='right'>
                    <Box className={"status"} />
                </Tooltip>

                <PopoverBody className={"contentBody"}>
                    <VStack className={"mainContent"}
                            divider={<StackDivider borderColor='gray' paddingTop={"5px"} />}
                            spacing={4} align='stretch'>
                        <Box>
                            <span className={"userName"}>{user.name}</span>
                            <span className={"role"}>{user.role.toUpperCase()}</span>
                            <Box className={"userEmail"}>{user.email}</Box>
                        </Box>
                        <Box className={"blockMargin5"}>
                            <div className={"quoteContent"}>{user.description}</div>
                        </Box>
                        <VStack align="left">
                            <ResponsiveContainer width="100%" height={60}>
                                <BarChart data={data}>
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Bar dataKey="hours" fill="#383ebc" />
                                </BarChart>
                            </ResponsiveContainer>
                        </VStack>
                        <VStack align="left" className={"blockMargin5"}>
                            {user.tasks.map((task, index) => (
                                <Checkbox key={index} className={"taskItem"}>{task}</Checkbox>
                            ))}
                        </VStack>
                        <Box></Box>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default UserInfoPopover;