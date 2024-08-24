import Header from "../components/Header"
import Sidenav from "../components/Sidenav"

import { Center, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import {
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";


function RASummary() {
    const session = useSession();

    return (
        <Flex flexDirection = {"column"} height = {"100vh"}>
            <Header/>
            <Flex flexDirection = {"row"} height = {"100%"}>
                {
                    session ? (
                        <>
                            <Sidenav></Sidenav>
                            <Flex flexDirection = {"column"} height = {"100%"} width = {"100%"} paddingLeft = {"50px"} paddingRight = {"50px"}>
                                <Heading paddingTop = {"25px"}>
                                    RA Summary
                                </Heading>
                                <Center>
                                    <Divider orientation = "horizontal" marginTop = {"38px"} width = {"90%"} bgColor = {"DFESEB"}>

                                    </Divider>
                                </Center>
                                <Text noOfLines={3}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus veritatis error illum neque inventore recusandae officiis unde velit dicta laboriosam tenetur harum quo sit est, ratione libero pariatur, dignissimos aliquid atque labore repudiandae expedita? Voluptates vero suscipit aut. Omnis assumenda a tempora vel cumque quae minus esse debitis facere, optio ducimus cum, minima et rem ipsam beatae similique qui repellat aut obcaecati. Officia hic quis praesentium odio temporibus eligendi illum laudantium quisquam, a magnam repellat assumenda facilis delectus maxime repellendus dolores sit doloribus vero impedit. Vitae explicabo quaerat culpa nemo eligendi sequi, itaque, fugiat consectetur nisi voluptatum est deleniti! Voluptates.
                                </Text>
                                <TableContainer width = {"100%"}>
                                    <Table variant='striped' colorScheme='teal'>
                                        <Thead>
                                            <Tr>
                                                <Th> RA </Th>
                                                <Th isNumeric> Hours </Th>
                                                <Th isNumeric> Week 1 </Th>
                                                <Th isNumeric> Week 2 </Th>
                                                <Th isNumeric> Week 3 </Th>
                                                <Th isNumeric> Week 4 </Th>
                                                <Th isNumeric> Week 5 </Th>
                                                <Th isNumeric> Week 6 </Th>
                                                <Th isNumeric> Week 7 </Th>
                                                <Th isNumeric> Week 8 </Th>
                                                <Th isNumeric> Week 9 </Th>
                                                <Th isNumeric> Week 10 </Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                            <Tr>
                                                <Td> John </Td>
                                                <Td> 55 </Td>
                                                <Td isNumeric> 1 </Td>
                                                <Td isNumeric> 2 </Td>
                                                <Td isNumeric> 3 </Td>
                                                <Td isNumeric> 4 </Td>
                                                <Td isNumeric> 5 </Td>
                                                <Td isNumeric> 6 </Td>
                                                <Td isNumeric> 7 </Td>
                                                <Td isNumeric> 8 </Td>
                                                <Td isNumeric> 9 </Td>
                                                <Td isNumeric> 10 </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Flex>
                        </>
                    ) : (
                        <div>
                            Not logged in.
                        </div>
                    )
                }
            </Flex>x
        </Flex>
    )
}

export default RASummary;