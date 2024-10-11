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
    Heading,
    Spacer,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
    Editable, EditablePreview, EditableTextarea,
    useToast,
} from "@chakra-ui/react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";

import AddTodoModal from "../components/AddTodoModal";

function PersonalSummary() {
    const session = useSession();
    const supabase = useSupabaseClient();
    const toast = useToast();
    const tag = [
        ["Admin", "blue"],
        ["Organization", "green"],
        ["Project-Two", "purple"],
        ["Organization-One", "pink"],
    ];
    const date = new Date();
    const [tasks, setTasks] = useState([]);
    const hours = [10, 20, 13, 15, 17, 23, 19, 10, 20, 19];
    const userName = localStorage.getItem("username");
    const [taskAmount, setTaskAmount] = useState(0);
    const [notes, setNotes] = useState("Add your notes here...");

    async function fetchUserTodosAndNotes() {
        if (session) {
            const {data: TASKS, error: taskError} = await supabase
                .from("Tasks")
                .select("task_name, task_id")
                .eq("assigned_to", session.user.id)
                .in("status", ["NotStarted", "InProgress"]);

            const { data: TODOS, error: todoError } = await supabase
                .from("ToDos")
                .select("to_do, entry_id")
                .eq("user_id", session.user.id)
                .eq("completed", false);

            const { data: NOTES, error: noteError } = await supabase
                .from("Notes")
                .select("notes, entry_id")
                .eq("user_id", session.user.id)

            if (taskError) {
                console.error("Error fetching user's task: ", taskError);
            } else if (todoError) {
                console.error("Error fetching user's todos: ", todoError);
            } else if (noteError) {
                console.error("Error fetching user's notes: ", noteError);
            } else {
                const tasksWithCompletionStatus = TASKS.map(task => ({
                    ...task,
                    isCompleted: false,
                    isHidden: false,
                    isTask: true,
                }));
                const todosWithCompletionStatus = TODOS.map(todo => ({
                    ...todo,
                    isCompleted: false,
                    isHidden: false,
                    isTask: false,
                }));
                const combinedTasksAndTodos = [...tasksWithCompletionStatus, ...todosWithCompletionStatus];

                setTasks(combinedTasksAndTodos);
                setTaskAmount(combinedTasksAndTodos.length);
                setNotes(NOTES[0]?.notes? NOTES[0].notes : "Add your notes here...");
            }
        }
    }

    useEffect(() => {
        fetchUserTodosAndNotes();
    }, [session, supabase]);

    const handleTodoUpdate = () => {
        fetchUserTodosAndNotes();
    };

    const handleNotesSubmit = async (newNotes) => {
        try {
            const { error } = await supabase
                .from("Notes")
                .upsert({
                    user_id: session.user.id,
                    notes: newNotes,
                }, { onConflict: ['user_id'] });

            if (error) {
                console.error("Error updating notes: ", error);
            } else {
                setNotes(newNotes);
                toast({
                    title: "Success!",
                    description:
                        "You have successfully updated your notes!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (err) {
            console.error("Error submitting notes: ", err);
        }
    };

    const handleTaskCompletion = async (isTask, taskId) => {
        try {
            if (isTask) {
                const {error} = await supabase
                    .from("Tasks")
                    .update({status: "Completed"})
                    .eq("task_id", taskId);

                if (error) {
                    console.error("Error updating task status: ", error);
                    return;
                }

                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.task_id === taskId
                            ? {...task, isCompleted: true}
                            : task
                    )
                );
                setTaskAmount(taskAmount-1);
                setTimeout(() => {
                    setTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task.task_id === taskId
                                ? {...task, isHidden: true}
                                : task
                        )
                    );
                }, 1000);
            } else {
                const {error} = await supabase
                    .from("ToDos")
                    .update({completed: true})
                    .eq("entry_id", taskId);

                if (error) {
                    console.error("Error updating todo status: ", error);
                    return;
                }

                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.entry_id === taskId
                            ? {...task, isCompleted: true}
                            : task
                    )
                );
                setTaskAmount(taskAmount-1);
                setTimeout(() => {
                    setTasks((prevTasks) =>
                        prevTasks.map((task) =>
                            task.entry_id === taskId
                                ? {...task, isHidden: true}
                                : task
                        )
                    );
                }, 1000);
            }
        } catch (err) {
            console.error("Error completing task: ", err);
        }
    };

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
            <Header/>
            {session ? (
                <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
                    <Sidenav/>
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
                                        <TagCloseButton/>
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
                                                {date.toLocaleString("en-US", {month: "long"})}{" "}
                                                {date.getDate()}
                                                {getNumberSuffix(date.getDate())}
                                            </Text>
                                            <Text
                                                marginLeft={4}
                                                fontSize={12}
                                                color={"grey"}
                                                marginBottom={5}
                                            >
                                                {date.toLocaleString("en-US", {weekday: "long"})}
                                            </Text>
                                        </Box>
                                        <Spacer/>
                                        <Text margin={5}>{taskAmount} Tasks</Text>
                                    </Flex>
                                    <Divider/>
                                    <AddTodoModal  onUpdate={handleTodoUpdate}/>
                                    <VStack align="left" marginTop={5} overflowY={"scroll"}>
                                        {tasks.filter((task) => !task.isHidden).map((task, index) => (
                                            <Box key={task.task_id}>
                                                <Checkbox
                                                    key={index}
                                                    padding={"2px"}
                                                    borderRadius={"5px"}
                                                    paddingLeft={"15px"}
                                                    marginTop={"5px"}
                                                    isChecked={task.isCompleted}
                                                    onChange={() => handleTaskCompletion(task.isTask, task.isTask?task.task_id:task.entry_id)}
                                                >
                                                    <Text marginLeft={5}
                                                          _after={{
                                                              content: '""',
                                                              position: "absolute",
                                                              left: 0,
                                                              top: "50%",
                                                              height: "2px",
                                                              width: task.isCompleted ? "100%" : "0",
                                                              backgroundColor: "black",
                                                              transition: "width 0.5s ease-in-out",
                                                          }}
                                                          opacity={task.isCompleted ? 0 : 1}
                                                          transition="opacity 1s ease-in-out"
                                                    >
                                                        {task.isTask?task.task_name:task.to_do}
                                                    </Text>
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
                                        {date.toLocaleString("en-US", {month: "long"})} Scheduled
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
                                    <Editable
                                        value={notes}
                                        onChange={(newNotes) => setNotes(newNotes)}
                                        onSubmit={handleNotesSubmit}
                                        margin={2}
                                        marginLeft={4}
                                    >
                                        <EditablePreview />
                                        <EditableTextarea />
                                    </Editable>
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
                                        <Divider/>
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
                                        <Button
                                            height={"60%"}
                                            top={"40%"}
                                            width={"45%"}
                                            fontSize={20}
                                            color={"#5086ca"}
                                        >
                                            Weekly Check-In
                                        </Button>
                                        <Spacer/>
                                        <Button
                                            height={"60%"}
                                            top={"40%"}
                                            width={"20%"}
                                            fontSize={20}
                                            color={"#5086ca"}
                                        >
                                            T2W
                                        </Button>
                                        <Spacer/>
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
