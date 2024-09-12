import {
  Box,
  Flex,
  IconButton,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  Spacer,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";

import React from "react";
import AccountPopup from "./AccountPopup";

function IndividualProjectHeader() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"100%"}
      h={"8%"}
      bg={"#E9E9E9"}
      boxShadow={"md"}
      padding={"1%"}
      zIndex={5}
    >
      <Box>
        <Text fontWeight="bold" fontSize="1.8rem">
          Logo
        </Text>
      </Box>
      <Spacer />
      <Box mr={"1%"}>
        <InputGroup mt={"1%"} alignItems={"center"}>
          <Input
            placeholder="Search this project..."
            borderRadius={"5px"}
            bg="white"
          />
          <InputRightElement>
            <IconButton
              aria-label="Search database"
              icon={<Search2Icon />}
              bg="white"
              size="sm"
            />
          </InputRightElement>
        </InputGroup>
      </Box>
      <AccountPopup />
    </Flex>
  );
}

export default IndividualProjectHeader;
