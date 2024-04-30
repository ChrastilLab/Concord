import { React, useState, useEffect, useRef } from "react";
import { Input, Box, Text } from "@chakra-ui/react";

export const SelectableInput = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const selectList = props.list;

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelect = (item) => {
    setInputValue(item);
  };

  const renderText = (item) => {
    if (inputValue === "" || (inputValue !== "" && item.includes(inputValue))) {
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
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Assigned RA"
        ></Input>
        {showDropdown && (
          <Box
            bg="white"
            border="1px"
            borderRadius={6}
            position="absolute"
            minHeight="1.5rem"
            maxHeight="15rem"
            width="100%"
            zIndex={10}
            padding="0.2rem"
            overflow="auto"
          >
            {/* TODO: Fix right side corner border bug */}
            {selectList.map(renderText)}
          </Box>
        )}
      </Box>
    </>
  );
};
