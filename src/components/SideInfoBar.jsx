import { Button, Text, Heading, Flex, Stack } from "@chakra-ui/react";
import NewOrgForm from "./NewOrgFrom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { userData } from "./AccountPopup";

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
      <Flex position={"fixed"} bottom="80px" gap={"20px"} flexDir={"column"}>
        <NewOrgForm></NewOrgForm>
        {userData.role !== "admin" ? (
          <Button
            leftIcon={<UserPlusIcon width={"20px"} />}
            width={"180px"}
            height={"35px"}
            fontSize={"15px"}
          >
            Join Organization
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}
