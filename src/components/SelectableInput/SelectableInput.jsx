import { React, useState, useEffect, useRef } from "react";
import { Input, Box, Text } from "@chakra-ui/react";

export const SelectableInput = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const selectList = [
    "",
    "Hello",
    "Test",
    "Select",
    "List",
    "RA 1",
    "RA 2",
    "RA 3",
    "RA 4",
    "abc",
    "abcd",
    "abcde",
    "abcdef",
    "abcdefg",
  ];

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (item) => {
    console.log(item);
    setInputValue(item);
  };

  const renderText = (item) => {
    if (inputValue === "" || (inputValue != "" && item.includes(inputValue))) {
      return (
        <Box
          key={item}
          _hover={{ bg: "gray.200" }}
          onMouseDown={() => handleSelect(item)}
          minHeight="1.5rem"
        >
          <Text paddingLeft="0.3rem">{item}</Text>
        </Box>
      );
    }
  };

  return (
    <>
      <Box position="relative">
        <Input
          onFocus={handleShowDropdown}
          onBlur={handleShowDropdown}
          value={inputValue}
          onChange={handleChange}
          placeholder="Assigned RA"
        ></Input>
        {showDropdown && (
          <Box
            bg="white"
            border="1px"
            borderRadius={6}
            position="absolute"
            minHeight="1.5rem"
            width="100%"
            zIndex={10}
            padding="0.2rem"
            overflow="hidden"
          >
            {selectList.map(renderText)}
          </Box>
        )}
      </Box>
    </>
  );
};
