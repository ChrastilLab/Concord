import React from "react";

import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";
import {
  EllipsisVerticalIcon,
  MegaphoneIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";

function OrganizationCard({ organization, description, color_scheme }) {
  return (
    <Card maxW="sm" marginTop="50px" width={"304px"}>
      <Box
        bgColor={color_scheme}
        height={"135px"}
        padding={"0px"}
        margin={"0px"}
      >
        <Button
          variant={"link"}
          width={"50px"}
          mt={"5px"}
          position="absolute"
          top={"10px"}
          right={"5px"}
        >
          <EllipsisVerticalIcon
            style={{
              height: "30px",
              width: "30px",
              color: "white",
            }}
          />
        </Button>
      </Box>
      <CardBody>
        <Stack spacing="2">
          <Heading size="md" color={color_scheme}>
            {organization}
          </Heading>
          <Text fontSize={"12px"}>{description}</Text>
          <Flex flexDir={"row"} gap={"15px"}>
            <Button
              variant={"link"}
              color={"black"}
              _hover={{ color: "#708090" }}
            >
              <MegaphoneIcon
                style={{
                  height: "20px",
                  width: "20px",
                }}
              ></MegaphoneIcon>
            </Button>

            <Button
              variant={"link"}
              color={"black"}
              _hover={{ color: "#708090" }}
            >
              {" "}
              <FolderIcon
                style={{
                  height: "20px",
                  width: "20px",
                }}
              ></FolderIcon>
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default OrganizationCard;
