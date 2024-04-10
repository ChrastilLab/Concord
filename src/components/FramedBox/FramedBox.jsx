import { Box, Flex, Text, Spacer, Container } from "@chakra-ui/react";

function FramedBox(props) {
  let { title1, title2, children } = props;
  return (
    <Flex
      border="1px"
      padding="10px"
      direction="column"
      h="100%"
      w="100%"
      bg="#bbbbbb"
    >
      <Box>
        <Flex marginBottom="10px">
          <Text as="b" fontSize="3xl">
            {title1}
          </Text>
          <Spacer />
          <Text as="b" fontSize="3xl">
            {title2}
          </Text>
        </Flex>
      </Box>

      {children}
    </Flex>
  );
}

export default FramedBox;
