import { Button, Text, Heading, Flex, Stack } from "@chakra-ui/react";
import NewOrgForm from "./NewOrgFrom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

export default function SideInfoBar({ numOrgs, userCreatedOrgs }) {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("Users")
        .select("user_id, user_type")
        .eq("user_id", session.user.id);

      if (!error) {
        setUserData(data[0]);
      }
    };

    fetchUserData();
  }, []);

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
        <Text>{userCreatedOrgs}</Text>
      </Stack>
      <Flex position={"fixed"} bottom="80px" gap={"20px"} flexDir={"column"}>
        <NewOrgForm></NewOrgForm>
        {userData.user_type ? (
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
