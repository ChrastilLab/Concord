import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import {
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

function LabSheets() {
  const { isLoading } = useSessionContext();
  const session = useSession();
  const weeksInQuarter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const raData = [
    {
      name: "John",
      toDo: "mewo",
      notes: "hello from me i am john ehehe",
      hours: 40,
    },
    {
      name: "Sally",
      toDo: "mewo2",
      notes: "lorem ipsumn i am a cow hat in the cat mat rat sat dat",
      hours: 80,
    },
    {
      name: "Octoopos",
      toDo: "mewo3",
      notes:
        "text text text one day i am a cow in the sunny field eating grass mewo",
      hours: 20,
    },
  ];
  const RaNames = ["John", "Sally", "Octoopos"];
  const toDo = ["meow", "meow2", "meoww3"];
  const notes = ["hihi", "lorem ipsum meow meow", "some kinda text i think"];
  const hours = [40, 80, 20];

  return (
    <Center>
      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th>RA</Th>
              <Th>To-do</Th>
              <Th>Notes</Th>
              <Th>Hours/Credits</Th>
              {weeksInQuarter.map((week) => (
                <Th>Week {week}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {raData.map((ra) => (
              <Tr>
                <Td>{ra.name}</Td>
                <Td>{ra.toDo}</Td>
                <Td>{ra.notes}</Td>
                <Td>{ra.hours}</Td>
                {weeksInQuarter.map((w) => (
                  <Td>{w}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
}

export default LabSheets;
