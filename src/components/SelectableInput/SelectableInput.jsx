import { React, useState, useEffect } from "react";
import { Input, Box } from "@chakra-ui/react";

export const SelectableInput = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleEditSelect = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <Input onFocus={handleEditSelect} onBlur={handleEditSelect}></Input>
      {showDropdown ? <Box bg="cyan">Hello</Box> : <></>}
    </>
  );
};
