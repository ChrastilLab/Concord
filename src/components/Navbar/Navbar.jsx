import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Spacer,
  Avatar,
  Text,
  Square,
  Button,
  Center,
} from "@chakra-ui/react";

function Navbar(props) {
  const navigate = useNavigate();

  let navTitle = props.navTitle;

  return (
    <div>
      <Box zIndex="10" bg="blackAlpha 300" boxShadow="md">
        <Flex>
          <Box p={5}>
            <Text as="b" fontSize="4xl">
              {navTitle}
            </Text>
          </Box>
          <Spacer />
          <Square p={5}>
            <Avatar />
          </Square>
          <Center pr={5}>
            <Button size="md">Logout</Button>
          </Center>
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;
