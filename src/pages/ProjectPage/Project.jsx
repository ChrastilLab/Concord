import React, { useEffect, useState } from "react";
import { Box, Flex, Button, Text, Spacer } from "@chakra-ui/react";
import FramedBox from "../../components/FramedBox/FramedBox";

function Project() {
  return (
    <Box padding="20px" h="100vh">
      <Flex w="100%" h="100%">
        <Flex direction="column" flex={1} mr="10px" h="100%">
          <Box paddingBottom="20px" h="50%">
            <FramedBox></FramedBox>
          </Box>
          <Box paddingBottom="20px" h="50%">
            <Text>Tasks</Text>
          </Box>
        </Flex>
        <Flex direction="column" flex={1} ml="10px" h="100%">
          <Box h="20%">
            <Text>Project Details</Text>
          </Box>
          <Flex justifyContent="center" alignItems="center" h="10%">
            <Button w="100%">Slack Channel</Button>
          </Flex>
          <Box h="70%">
            <Text>Project Documents</Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Project;
