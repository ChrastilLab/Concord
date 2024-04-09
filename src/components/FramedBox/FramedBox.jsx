import { Box, Flex, Text, Spacer } from "@chakra-ui/react";

function FramedBox(props) {
  let title1 = props.title1;
  title1 = "Team Members"; // test value
  let title2 = props.title2;
  title2 = "Right Title";
  return (
    <Flex bg="cyan" padding="10px" direction="column" h="100%">
      <Box bg="green">
        <Flex bg="purple">
          <Text as="b" fontSize="3xl">
            {title1}
          </Text>
          <Spacer />
          <Text as="b" fontSize="3xl">
            {title2}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default FramedBox;
