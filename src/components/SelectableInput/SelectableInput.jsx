import { React, useState, useEffect, useRef } from "react";
import { Input, Box, Text } from "@chakra-ui/react";

export const SelectableInput = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef(null);
  const selectList = ["Hello", "Test", "Select", "List"];

  const handleFocus = () => {
    // console.log("edit select");
    setShowDropdown(true);
  };

  const handleBlur = (event) => {
    // Delay hiding the dropdown to check if the new focused element is outside the component
    console.log("blur");
    setTimeout(() => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.relatedTarget)
      ) {
        setShowDropdown(false);
      }
    }, 0);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (item) => {
    console.log(item);
    setInputValue(item);
    setShowDropdown(false);
  };

  return (
    <>
      <Box position="relative">
        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputValue}
          onChange={handleChange}
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
            {selectList.map((item) => (
              <Box
                key={item}
                _hover={{ bg: "gray.200" }}
                onClick={() => handleSelect(item)}
              >
                <Text paddingLeft="0.3rem">{item}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};
