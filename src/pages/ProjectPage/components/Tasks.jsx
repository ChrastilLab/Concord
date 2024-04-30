import { Box, Text, List, ListItem } from "@chakra-ui/react";
import FramedBox from "../../../components/FramedBox/FramedBox";

function Tasks(props) {
  const tasks = props.tasks;
  return (
    <FramedBox title1="Tasks">
      <Box h="100%" w="100%" bg="#eeeeee" padding="5px">
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index}>
              {/* maybe some kind of task component here? */}
              <Text>{task}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </FramedBox>
  );
}

export default Tasks;
