import { Flex } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

export default function Organization() {
  const { orgName } = useParams();
  return <Flex>{orgName}</Flex>;
}
