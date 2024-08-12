import { Text, Heading, Flex, Stack, Button } from "@chakra-ui/react";
import NewOrgForm from "./NewOrgFrom";

export default function SideInfoBar({ numOrgs }) {
  return (
    <Flex
      flexDirection={"column"}
      width={"200px"}
      marginTop={"30px"}
      gap={"10px"}
    >
      <Stack spacing={"2"}>
        <Heading fontSize={"16px"}>Total Organizations</Heading>
        <Text>{numOrgs}</Text>
      </Stack>
      <Stack spacing={"2"}>
        <Heading fontSize={"16px"}>Created Organizations</Heading>
        <Text>0</Text>
      </Stack>
      <NewOrgForm></NewOrgForm>
    </Flex>
  );
}
