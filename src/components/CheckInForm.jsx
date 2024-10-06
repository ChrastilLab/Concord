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
} from "@chakra-ui/react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { wrap } from "framer-motion";
import { useState } from "react";

export default function CheckInForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ratings, setRating] = useState([1, 1, 1]); // 3 types of ratings
  const ratingOptions = ["1", "2", "3", "4", "5"];
  const ratingTypes = [
    "Guidance Received",
    "Previous Goals Completion",
    "Confidence Level",
  ];

  function updateSpeficRating(typeIdx, newRating) {
    const updatedRatings = ratings.map((item, idx) =>
      idx === typeIdx ? newRating : item
    );
    setRating(updatedRatings);
  }

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
        <ModalContent minWidth={"700px"}>
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
                maxWidth={"560px"}
              >
                <Table
                  variant="simple"
                  marginLeft={"10px"}
                  marginRight={"10px"}
                  maxWidth={"530px"}
                >
                  <Thead>
                    <Tr>
                      <Th>Task</Th>
                      <Th>Date</Th>
                      <Th isNumeric>Duration</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>task to do something</Td>
                      <Td>08/12/2022</Td>
                      <Td isNumeric>
                        <Select placeholder="No. of Hours">
                          <option value="option1">Option 1</option>
                        </Select>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>task to do something</Td>
                      <Td>08/12/2022</Td>
                      <Td isNumeric>
                        <Select placeholder="No. of Hours">
                          <option value="option1">Option 1</option>
                        </Select>
                      </Td>
                    </Tr>

                    <Tfoot>
                      <Td>
                        <IconButton
                          right={"-470px"}
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
              <Textarea maxWidth={"600px"}></Textarea>
              <Text fontWeight={"bold"}>Questions or Concenrns?</Text>
              <Textarea maxWidth={"600px"}></Textarea>

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
              <Select placeholder="Select" width={"200px"}>
                <option value="option1">Option 1</option>
              </Select>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Submit Check-in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
