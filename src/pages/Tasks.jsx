
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
  Grid,
  Select,
  Flex,
  Heading,
  IconButton,
  Popover,
  Checkbox,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  } from '@chakra-ui/react';
  import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
  

import {
    useSession,
    useSupabaseClient,
    useSessionContext,
} from "@supabase/auth-helpers-react";
import { ChevronDownIcon } from '@chakra-ui/icons';




function Tasks() {
  const [tasks, setTasks] = useState([
    { name: 'Research participant #1132 lab session 3', type: 'Scheduled', startDate: '2024-07-10 13:30', endDate: '2024-07-10 15:30', status: 'Not Started' },
    { name: 'Finish lab report 1', type: 'Deadline', startDate: '-', endDate: '2024-06-29 11:59', status: 'Completed' },
    { name: 'Finish lab report 2', type: 'Deadline', startDate: '-', endDate: '2024-07-15 11:59', status: 'Not Started' },
    { name: 'A very long title for some task just for ...', type: 'Scheduled', startDate: '2024-07-11 14:20', endDate: '2024-07-11 16:00', status: 'Not Started' },
    { name: 'Conduct MRI scan on participant #1022', type: 'Scheduled', startDate: '2024-07-19 11:30', endDate: '2024-07-19 13:30', status: 'Not Started' },
    { name: 'Research participant #1132 lab session 3', type: 'Scheduled', startDate: '2024-07-10 13:30', endDate: '2024-07-10 15:30', status: 'Not Started' },
    { name: 'Finish lab report 1', type: 'Deadline', startDate: '-', endDate: '2024-06-29 11:59', status: 'Completed' },
    { name: 'Finish lab report 2', type: 'Deadline', startDate: '-', endDate: '2024-07-15 11:59', status: 'Not Started' },
    { name: 'A very long title for some task just for ...', type: 'Scheduled', startDate: '2024-07-11 14:20', endDate: '2024-07-11 16:00', status: 'Not Started' },
  ]);

  const [taskName, setTaskName] = useState('');
const [taskType, setTaskType] = useState('Scheduled');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [members, setMembers] = useState('');
const [taskDescription, setTaskDescription] = useState('');

const { isOpen, onOpen, onClose } = useDisclosure();

    const session = useSession();
    const allColumns = ['Task Name', 'Task Type', 'Start Date', 'End Date', 'Status'];
  const [visibleColumns, setVisibleColumns] = useState(allColumns);


  const handleColumnChange = (column) => {
    setVisibleColumns(prev => {
      const newColumns = prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column];
      console.log('Visible columns:', newColumns);
      return newColumns;
    });
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
    console.log(`Task ${index} status changed to: ${newStatus}`);
  };


  return (
    <Flex flexDirection={'column'} height={'100vh'}>
        <Header />
        {
            session ? (
                <Box flex={1} display={'flex'} flexDirection={'row'} zIndex={1}>
                    <Sidenav />
                    <Box width='98%' marginLeft='1%' marginRight='1%' p={10}>
  <Heading fontSize='3.2rem' mb={4}>Tasks</Heading>
  <Flex justify="space-between" mb={4} align="flex-end">
    <Flex >
      <Input boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"  height='4.5vh' width='35vh' borderWidth='2px' placeholder="Search tasks..." mr={2} />
      <Popover
  isOpen={isOpen}
  onClose={onClose}
  placement="bottom-start"
  closeOnBlur={false}
>
  <PopoverTrigger>
    <Button
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
      width='12vh'
      height='4.5vh'
      marginLeft='8%'
      colorScheme="blue"
      onClick={onOpen}
    >
      Add Task
    </Button>
  </PopoverTrigger>
  <PopoverContent borderWidth='2px' borderColor='#A1A1AA' borderRadius='5px' width="5vhpx">
    <PopoverCloseButton />
    <PopoverBody>
      <FormControl>
        <FormLabel fontWeight={'bold'}>Task Name</FormLabel>
        <Input borderWidth='2px' borderColor='#A1A1AA' placeholder="Task Name..." value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel fontWeight={'bold'}>Task Type</FormLabel>
        <Select borderWidth='2px' borderColor='#A1A1AA' value={taskType} onChange={(e) => setTaskType(e.target.value)}>
          <option value="Scheduled">Scheduled</option>
          <option value="Deadline">Deadline</option>
        </Select>
      </FormControl>
      <Grid templateColumns="repeat(2, 1fr)" gap={2} mt={4}>
        <FormControl>
          <FormLabel fontWeight={'bold'} fontSize="sm">Start Date</FormLabel>
          <Input 
            borderWidth='2px' 
            borderColor='#A1A1AA' 
            type="datetime-local" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
            
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={'bold'} fontSize="sm">End Date</FormLabel>
          <Input 
            borderWidth='2px' 
            borderColor='#A1A1AA' 
            type="datetime-local" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
            
          />
        </FormControl>
      </Grid>
      <FormControl mt={4}>
        <FormLabel fontWeight={'bold'}>Member(s)</FormLabel>
        <Input borderWidth='2px' borderColor='#A1A1AA' placeholder="Select Members" value={members} onChange={(e) => setMembers(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel fontWeight={'bold'}>Task Description</FormLabel>
        <Textarea borderWidth='2px' borderColor='#A1A1AA' placeholder="Description for this task" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
      </FormControl>
    </PopoverBody>
    <PopoverFooter border='None' display="flex" justifyContent="flex-end">
      <Button bg="black" color={'white'} onClick={onClose}>
        Save Task
      </Button>
    </PopoverFooter>
  </PopoverContent>
</Popover>
    </Flex>
    <Popover>
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
            <PopoverContent>
              <PopoverBody>
                <Stack spacing={2}>
                  {['Task Name', 'Task Type', 'Start Date', 'End Date', 'Status'].map((column) => (
                    <Checkbox 
                      key={column} 
                      isChecked={visibleColumns.includes(column)}
                      onChange={() => handleColumnChange(column)}
                    >
                      {column}
                    </Checkbox>
                  ))}
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
  </Flex>
  <TableContainer fontSize='lg' marginTop='2%' borderWidth='1.5px' borderRadius="md" borderColor="#A1A1AA" >
  <Table  borderRadius="md" variant="simple" borderColor="gray.200" sx={{ 
                  'th, td': { 
                    '&:first-of-type': { paddingLeft: '7vh' },
                    '&:last-of-type': { paddingRight: '7vh' }
                  }
                }}>
    <Thead borderBottomWidth="1.5px" borderColor="#A1A1AA">
  <Tr borderBottomWidth="1.5px" borderColor="#A1A1AA">
    {visibleColumns.includes('Task Name') && (
      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
        Task name
      </Th>
    )}
    {visibleColumns.includes('Task Type') && (
      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
        Task type
      </Th>
    )}
    {visibleColumns.includes('Start Date') && (
      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
        Start date
      </Th>
    )}
    {visibleColumns.includes('End Date') && (
      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
        End date
      </Th>
    )}
    {visibleColumns.includes('Status') && (
      <Th fontSize="xl" textTransform="none" fontWeight="normal" py={4}>
        Status
      </Th>
    )}
    <Th></Th>
  </Tr>
</Thead>
      <Tbody >
      {tasks.map((task, index) => (
                <Tr borderBottomWidth={index === tasks.length - 1 ? "0" : "1.2px"}
      borderColor="#A1A1AA" 
      key={index}>
                  {visibleColumns.includes('Task Name') && <Td>{task.name}</Td>}
                  {visibleColumns.includes('Task Type') && <Td>{task.type}</Td>}
                  {visibleColumns.includes('Start Date') && <Td>{task.startDate}</Td>}
                  {visibleColumns.includes('End Date') && <Td>{task.endDate}</Td>}
                  {visibleColumns.includes('Status') && (
                    <Td>
                      <Select 
                      borderWidth='1.5px' borderRadius="md" borderColor="#A1A1AA"
                        value={task.status} 
                        width='80%'
                        height='3vh'
                        size="sm" 
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </Select>
                    </Td>
                  )}
                  <Td>...</Td>
                </Tr>
              ))}
      </Tbody>
    </Table>
  </TableContainer>
  
</Box>
                    
                </Box>
            ) : (
                <div>
                    Not logged in
                </div>
            )
        }
        
    </Flex>
  );


}

export default Tasks;