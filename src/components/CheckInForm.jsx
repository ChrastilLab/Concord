import {
  Text,
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  Flex,
  Select,
  ButtonGroup,
  Checkbox,
  useToast,
} from "@chakra-ui/react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const dummy_hours = {
  "task to do something": {
    date: "04/10/2022",
    duration: 18,
  },
  "task to do": {
    date: "04/10/2022",
    duration: 18,
  },
};
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split("T")[0];

export default function CheckInForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ratings, setRating] = useState([null, null, null]); // 3 types of ratings
  const ratingOptions = [1, 2, 3, 4, 5];
  const ratingTypes = [
    "Guidance Received",
    "Previous Goals Completion",
    "Confidence Level",
  ];
  const taskCheckedStatus = Object.keys(dummy_hours).reduce((acc, taskName) => {
    acc[taskName] = false;
    return acc;
  }, {});
  const [isTaskChecked, setIsTaskChecked] = useState(taskCheckedStatus);

  const supabase = useSupabaseClient();
  const session = useSession();
  const toast = useToast();

  const [checkInData, setCheckInData] = useState({
    hours: {},
    goals: null,
    questions: null,
    guidance_received_rating: null,
    confidence_level: null,
    prev_goal_completion: null,
    updated_availabilities: null,
  });

  function updateSpeficRating(typeIdx, newRating) {
    const updatedRatings = ratings.map((item, idx) =>
      idx === typeIdx ? newRating : item
    );
    setRating(updatedRatings);

    // udpate data to post to db also
    if (typeIdx === 0) {
      setCheckInData({
        ...checkInData,
        guidance_received_rating: newRating,
      });
    } else if (typeIdx === 1) {
      setCheckInData({
        ...checkInData,
        prev_goal_completion: newRating,
      });
    } else {
      setCheckInData({
        ...checkInData,
        confidence_level: newRating,
      });
    }
  }

  function handleTaskHoursChecked(event, task_name, task) {
    console.log(event.target.checked);
    if (event.target.checked && !(task_name in checkInData.hours)) {
      setIsTaskChecked({ ...isTaskChecked, [task_name]: true });
      setCheckInData({
        ...checkInData,
        hours: {
          ...checkInData.hours,
          [task_name]: {
            date: task.date,
            duration: parseInt(task.duration),
          },
        },
      });
    } else if (!event.target.checked) {
      const updatedData = { ...checkInData };
      delete updatedData.hours[task_name];
      setCheckInData(updatedData);
    }
  }

  async function handleSubmitClicked() {
    const isAnyFieldNull = Object.values(checkInData).some(
      (elem) =>
        elem === null ||
        (typeof elem === "object" && Object.keys(elem).length === 0)
    );

    if (isAnyFieldNull) {
      toast({
        title: "Cannot Created.",
        description: "Please provide all information for weekly check-in.",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    checkInData["user_id"] = session.user.id;
    checkInData["date"] = formattedDate;
    const { error } = await supabase
      .from("CheckinResponses")
      .insert(checkInData);

    if (!error) {
      setCheckInData({
        hours: {},
        goals: null,
        questions: null,
        guidance_received_rating: null,
        confidence_level: null,
        prev_goal_completion: null,
        updated_availabilities: null,
      }); // reset to default data
    }

    onClose();
  }

  console.log(checkInData);
  return (
    <>
      <Button
        height={"60%"}
        top={"40%"}
        width={"45%"}
        fontSize={20}
        color={"#5086ca"}
        onClick={onOpen}
      >
        Weekly Check-In
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"blackAlpha.300"} backdropFilter={"blur(2px)"} />
        <ModalContent minWidth={"800px"}>
          <ModalHeader
            textAlign={"center"}
            fontSize={"25px"}
            marginTop={"20px"}
          >
            Weekly Check-In Form
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={"15px"}>
              <Text fontWeight={"bold"}>Hours: </Text>
              <TableContainer
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                maxWidth={"600px"}
              >
                <Table
                  variant="simple"
                  marginLeft={"10px"}
                  marginRight={"10px"}
                  maxWidth={"560px"}
                >
                  <Thead>
                    <Tr>
                      <Th>Task</Th>
                      <Th>Date</Th>
                      <Th isNumeric>Duration</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.entries(dummy_hours).map(
                      ([task_name, task], idx) => (
                        <Tr key={idx}>
                          <Td>
                            <Flex marginLeft={"-10px"} gap={"10px"}>
                              <Checkbox
                                onChange={(e) =>
                                  handleTaskHoursChecked(e, task_name, task)
                                }
                              ></Checkbox>
                              <Text>{task_name}</Text>
                            </Flex>
                          </Td>
                          <Td>{task.date}</Td>
                          <Td isNumeric>
                            <Select
                              placeholder={"No. of Hours"}
                              value={
                                checkInData.hours[task_name]
                                  ? checkInData.hours[task_name].duration
                                  : null
                              }
                              onChange={
                                isTaskChecked[task_name]
                                  ? (e) =>
                                      setCheckInData({
                                        ...checkInData,
                                        hours: {
                                          ...checkInData.hours,
                                          [task_name]: {
                                            date: task.date,
                                            duration: parseInt(e.target.value),
                                          },
                                        },
                                      })
                                  : null
                              }
                            >
                              {Array.from({ length: 24 }, (_, h) => (
                                <option key={h + 1} value={h + 1}>
                                  {h + 1}
                                </option>
                              ))}
                            </Select>
                          </Td>
                        </Tr>
                      )
                    )}

                    <Tfoot>
                      <Td>
                        <IconButton
                          right={"-500px"}
                          isRound={true}
                          aria-label="add-task"
                          icon={<PlusCircleIcon />}
                          size={"sm"}
                          variant={"ghost"}
                        />
                      </Td>
                    </Tfoot>
                  </Tbody>
                </Table>
              </TableContainer>

              <Text fontWeight={"bold"}>Goal for next week: </Text>
              <Text marginTop={"-10px"} fontSize={"13px"} color={"grey"}>
                Seperate each goal with a new line
              </Text>
              <Textarea
                maxWidth={"680px"}
                value={checkInData.goals}
                onChange={(e) =>
                  setCheckInData({
                    ...checkInData,
                    goals: e.target.value,
                  })
                }
              ></Textarea>
              <Text fontWeight={"bold"}>Questions or Concenrns?</Text>
              <Textarea
                maxWidth={"680px"}
                value={checkInData.questions}
                onChange={(e) =>
                  setCheckInData({
                    ...checkInData,
                    questions: e.target.value,
                  })
                }
              ></Textarea>

              <Text fontSize={"15px"}>
                Rate the following on a scale of 1 to 5 based on:
              </Text>

              <Flex
                flexDir={"row"}
                flexWrap={"wrap"}
                columnGap={"100px"}
                rowGap={"20px"}
              >
                {ratingTypes.map((type, typeIdx) => (
                  <Flex flexDir={"column"} gap={2}>
                    <Text fontWeight={"bold"}>{type}</Text>
                    <Stack spacing={5} direction="row">
                      <ButtonGroup variant="outline">
                        {ratingOptions.map((option, index) => (
                          <Button
                            borderRadius={"full"}
                            borderColor="black"
                            key={index}
                            onClick={() => updateSpeficRating(typeIdx, option)}
                            colorScheme={
                              ratings[typeIdx] === option ? "blue" : "gray"
                            }
                            variant={
                              ratings[typeIdx] === option ? "solid" : "outline"
                            }
                          >
                            {option}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Stack>
                  </Flex>
                ))}
              </Flex>

              <Text fontWeight={"bold"}>
                Have you updated your RA availabilities on When2Meet/T2W?
              </Text>
              <Select
                placeholder="Select"
                onChange={(e) =>
                  setCheckInData({
                    ...checkInData,
                    updated_availabilities: e.target.value,
                  })
                }
                width={"200px"}
                color={"grey"}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Select>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSubmitClicked}>
              Submit Check-in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
