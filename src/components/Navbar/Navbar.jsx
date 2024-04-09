import { useNavigate } from "react-router-dom";
import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import UserControls from "./components/UserControls";

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
          <UserControls />
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;
