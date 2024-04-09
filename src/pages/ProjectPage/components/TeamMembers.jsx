import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import FramedBox from "../../../components/FramedBox/FramedBox";

function TeamMembers() {
  return (
    <FramedBox title1="Team Members" title2="Test Title">
      <Box h="100%" w="100%" bg="green">
        <Text></Text>
      </Box>
    </FramedBox>
  );
}

export default TeamMembers;
