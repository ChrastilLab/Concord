import { useNavigate } from "react-router-dom";
import { Box, Flex, Spacer, Text, Center } from "@chakra-ui/react";
import UserControls from "./components/UserControls";

function Navbar(props) {
  const navigate = useNavigate();
  // const navigateHome = () => {
  //   navigate(`/`);
  // };

  let navTitle = props.navTitle;

  return (
    <div>
      <Box zIndex="10" boxShadow="md">
        <Flex>
          <Center>
            <Text as="b" fontSize="4xl" marginLeft={5} marginRight={5}>
              {navTitle}
            </Text>
          </Center>
          <Spacer />
          <UserControls />
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;
