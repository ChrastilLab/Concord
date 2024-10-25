import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import MemberSelect from "../components/MemberSelect";

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  Td,
  TableContainer,
  Input,
  Button,
  Grid,
  Select,
  Flex,
  Heading,
  Popover,
  Checkbox,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import {
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function Tasks() {
  const supabase = useSupabaseClient();
  const [tasks, setTasks] = useState([]);

  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("Scheduled");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const session = useSession();
  const allColumns = [
    "Task Name",
    "Task Type",
    "Start Date",
    "End Date",
    "Status",
    "Assigned To",
  ];
  const [visibleColumns, setVisibleColumns] = useState(allColumns);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("Tasks")
      .select(`
        *,
        assigned_to:Users!Tasks_assigned_to_fkey(display_name)
      `)
      .order("start_date", { ascending: true });

    console.log(data);
    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data.map(task => ({
        ...task,
        assigned_to: task.assigned_to ? task.assigned_to.display_name : null
      })));
    }
  };

  const handleColumnChange = (column) => {
    setVisibleColumns((prev) => {
      const newColumns = prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column];
      return newColumns;
    });
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const { error } = await supabase
      .from("Tasks")
      .update({ status: newStatus })
      .eq("task_id", taskId);

    if (error) {
      console.error("Error updating task status:", error);
    } else {
      fetchTasks(); // Refresh tasks after update
    }
  };

  const handleAddTask = async () => {
    const newTask = {
      task_name: taskName,
      task_type: taskType,
      start_date: startDate,
      end_date: endDate,
      status: "Not Started",
      assigned_to: assignedTo,
      assigned_by: session.user.id,
      assigned_at: new Date().toISOString(),
      description: description,
    };

    const { error } = await supabase.from("Tasks").insert(newTask);

    if (error) {
      console.error("Error adding new task:", error);
    } else {
      fetchTasks();
      onClose();
      setTaskName("");
      setTaskType("Scheduled");
      setStartDate("");
      setEndDate("");
      setAssignedTo("");
      setDescription("");
    }
  };

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <Header />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          <Sidenav />
          <Box width="98%" marginLeft="1%" marginRight="1%" p={10}>
            <Heading fontSize="3.2rem" mb={4}>
              Tasks
            </Heading>
            <Flex justify="space-between" mb={4} align="flex-end">
              <Flex>
                <Input
                  boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
                  height="4.5vh"
                  width="35vh"
                  border="None"
                  placeholder="Search tasks..."
                  mr={2}
                />
                <Popover
                  isOpen={isOpen}
                  onClose={onClose}
                  placement="bottom-start"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <Button
                      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
                      width="12vh"
                      height="4.5vh"
                      marginLeft="8%"
                      colorScheme="blue"
                      onClick={onOpen}
                    >
                      Add Task
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    borderWidth="2px"
                    borderColor="#A1A1AA"
                    borderRadius="5px"
                    width="670px"
                    height="650px"
                    padding={4}
                  >
                    <PopoverCloseButton />
                    <PopoverBody>
                      <FormLabel fontWeight={"bold"}>Task Name</FormLabel>
                      <FormControl>
                        <Input
                          borderWidth="2px"
                          marginTop='0.2vh'
                          borderColor="#A1A1AA"
                          placeholder="Task Name..."
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                        />
                      </FormControl>
                      <FormLabel marginTop='1.2vh' fontWeight={"bold"}>Task Type</FormLabel>
                      <FormControl mt={4}>
                        <Select
                          borderWidth="2px"
                          borderColor="#A1A1AA"
                          value={taskType}
                          onChange={(e) => setTaskType(e.target.value)}
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="Deadline">Deadline</option>
                        </Select>
                      </FormControl>
                      <Grid templateColumns="repeat(2, 1fr)" gap={2} mt={4}>
                        <Box>
                          <FormLabel marginTop='1.1vh' fontWeight={"bold"} fontSize="sm">
                            Start Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              borderWidth="2px"
                              borderColor="#A1A1AA"
                              type="datetime-local"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormLabel marginTop='1.1vh' fontWeight={"bold"} fontSize="sm">
                            End Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              borderWidth="2px"
                              borderColor="#A1A1AA"
                              type="datetime-local"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                      <FormControl mt={4}>
                        <FormLabel fontWeight={"bold"}>Assigned To</FormLabel>
                        <MemberSelect onChange={(selectedUserId) => setAssignedTo(selectedUserId)} />
                      </FormControl>
                      <FormLabel  marginTop='1.3vh'  fontWeight={"bold"} >
                        Task Description
                      </FormLabel>
                      <FormControl mt={4}>
                        <Textarea
                          borderWidth="2px"
                          borderColor="#A1A1AA"
                          placeholder="Description for this task"
                          value={description} // Add this line
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </FormControl>
                    </PopoverBody>
                    <PopoverFooter 
                      marginTop='1vh'
                      border="None"
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Button bg="black" color={"white"} onClick={handleAddTask}>
                        Save Task
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Flex>
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <Button
                    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                    borderColor="#A1A1AA"
                    bg="white"
                    _hover={{ bg: "gray.50" }}
                  >
                    Columns
                  </Button>
                </PopoverTrigger>
                <PopoverContent padding={4}>
                  <PopoverBody>
                    <Stack spacing={3}>
                      {allColumns.map((column) => (
                        <Checkbox
                          size='bg'
                          key={column}
                          isChecked={visibleColumns.includes(column)}
                          onChange={() => handleColumnChange(column)}
                          spacing={4}
                        >
                          <Text fontSize='1.2rem'>{column}</Text>
                        </Checkbox>
                      ))}
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
            <TableContainer
              fontSize="md"
              marginTop="2%"
              borderWidth="1.5px"
              borderRadius="md"
              borderColor="#A1A1AA"
            >
              <Table
                borderRadius="md"
                variant="simple"
                borderColor="gray.200"
                sx={{
                  "th, td": {
                    "&:first-of-type": { paddingLeft: "7vh" },
                    "&:last-of-type": { paddingRight: "7vh" },
                  },
                }}
              >
                <Thead borderBottomWidth="1.5px" borderColor="#A1A1AA">
                  <Tr borderBottomWidth="1.5px" borderColor="#A1A1AA">
                    {visibleColumns.includes("Task Name") && (
                      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
                        Task name
                      </Th>
                    )}
                    {visibleColumns.includes("Task Type") && (
                      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
                        Task type
                      </Th>
                    )}
                    {visibleColumns.includes("Start Date") && (
                      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
                        Start date
                      </Th>
                    )}
                    {visibleColumns.includes("End Date") && (
                      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
                        End date
                      </Th>
                    )}
                    {visibleColumns.includes("Status") && (
                      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4} width='25vh'>
                        Status
                      </Th>
                    )}
                    {visibleColumns.includes("Assigned To") && (
                      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
                        Assigned To
                      </Th>
                    )}
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tasks.map((task, index) => (
                    <Tr
                      borderBottomWidth={index === tasks.length - 1 ? "0" : "1.2px"}
                      borderColor="#A1A1AA"
                      key={task.task_id}
                    >
                      {visibleColumns.includes("Task Name") && <Td>{task.task_name}</Td>}
                      {visibleColumns.includes("Task Type") && <Td>{task.task_type}</Td>}
                      {visibleColumns.includes("Start Date") && <Td>{new Date(task.start_date).toLocaleString()}</Td>}
                      {visibleColumns.includes("End Date") && <Td>{new Date(task.end_date).toLocaleString()}</Td>}
                      {visibleColumns.includes("Status") && (
                        <Td>
                          <Select
                            borderWidth="1.5px"
                            borderRadius="md"
                            borderColor="#A1A1AA"
                            value={task.status}
                            width="80%"
                            height="3vh"
                            size="sm"
                            onChange={(e) => handleStatusChange(task.task_id, e.target.value)}
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </Select>
                        </Td>
                      )}
                      {visibleColumns.includes("Assigned To") && <Td>{task.assigned_to}</Td>}
                      <Td>...</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default Tasks;