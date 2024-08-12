import { Text, Heading, Flex, Stack, Button } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

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
      <Button
        leftIcon={<PlusIcon width={"20px"} />}
        width={"180px"}
        height={"35px"}
        fontSize={"16px"}
        marginTop={"400px"}
      >
        Create New Org
      </Button>
    </Flex>
  );
}
