import React, { useEffect, useState } from "react";
import { Box, Flex, Button, Text, Spacer } from "@chakra-ui/react";

function Project() {
  return (
    <div style={{ height: "100vh" }}>
      <Box margin="20px">
        <Flex w="100%" h="100%" bg="cyan">
          <Flex direction="column" flex={1} mr="10px" h="100%">
            <Box w="100%">
              <Text>Team Members</Text>
            </Box>
            <Box w="100%">
              <Text>Tasks</Text>
            </Box>
          </Flex>
          <Flex direction="column" flex={1} ml="10px" h="100%">
            <Box>
              <Text>Project Details</Text>
            </Box>
            <Box>
              <Button>Slack Channel</Button>
            </Box>
            <Box>
              <Text>Project Documents</Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}

export default Project;
