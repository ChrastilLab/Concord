import { Box, Flex, Text } from "@chakra-ui/react";

import React from "react";
import "boxicons";
import AccountPopup from "./AccountPopup";

function Header() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"100%"}
      h={"70px"}
      bg={"#E9E9E9"}
      boxShadow={"md"}
      padding={"20px"}
      zIndex={5}
    >
      <Box>
        <Text fontWeight="bold" fontSize="1.8rem">
          Logo
        </Text>
      </Box>
      {<AccountPopup />}
    </Flex>
  );
}

export default Header;
