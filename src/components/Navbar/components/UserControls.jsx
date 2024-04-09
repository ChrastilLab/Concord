// Components don't need to be this complicated but this is just an example of separation of concerns
import { Avatar, Flex, Button, Center } from "@chakra-ui/react";

function UserControls() {
  return (
    <div>
      <Flex bg="cyan" p={5}>
        <Center>
          <Avatar />
          <Button size="md" ml={5}>
            Logout
          </Button>
        </Center>
      </Flex>
    </div>
  );
}

export default UserControls;
