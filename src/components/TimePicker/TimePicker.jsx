import { React, useState, useEffect, useRef } from "react";
import { Input, Box, Text, Stack } from "@chakra-ui/react";

export const TimePicker = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    console.log("handleShowdropdown");
    setShowDropdown(!showDropdown);
  };

  return (
    <Box position="relative">
      <Stack flexDir="horizontal" alignItems="center">
        {props.label && <Text paddingRight="0.5rem">{props.label}</Text>}
        <Input
          onFocus={handleShowDropdown}
          onBlur={handleShowDropdown}
          value={"00:00:00"}
          readOnly={true}
        ></Input>
      </Stack>
      {showDropdown && (
        <Box
          minHeight="200px"
          w="100%"
          bg="cyan"
          position="absolute"
          zIndex={10}
          marginTop="0.5rem"
        ></Box>
      )}
    </Box>
  );
};
