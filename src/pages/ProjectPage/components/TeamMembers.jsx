import React, { useEffect, useState } from "react";
import { Box, Text, List, ListItem } from "@chakra-ui/react";
import FramedBox from "../../../components/FramedBox/FramedBox";

function TeamMembers(props) {
  let members = props.members;

  return (
    <FramedBox title1="Team Members">
      <Box h="100%" w="100%" bg="#eeeeee" padding="5px" overflowY="auto">
        <List>
          {members.map((member, index) => (
            <ListItem key={index}>
              {/* maybe some kind of member component here? */}
              <Text>{member}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </FramedBox>
  );
}

export default TeamMembers;
