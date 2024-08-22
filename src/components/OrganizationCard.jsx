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
import { useNavigate } from "react-router-dom";

function OrganizationCard({ organization, description, color_scheme }) {
  const navigate = useNavigate();

  return (
    <Card
      maxW="sm"
      width={"270px"}
      height={"250px"}
      _hover={{ transform: "scale(1.05)", transition: "transform .3s" }}
      onClick={() => navigate(`/studies/${organization}`)}
    >
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
          <Heading size="md" color={color_scheme} isTruncated>
            {organization}
          </Heading>
          <Text fontSize={"11px"}>{description}</Text>
          <Flex flexDir={"row"} gap={"10px"}>
            <Button
              variant={"link"}
              color={"black"}
              _hover={{ color: "#708090" }}
              width={"20px"}
              minWidth={"20px"}
            >
              <MegaphoneIcon
                style={{
                  height: "20px",
                  width: "20px",
                }}
              >
                {" "}
              </MegaphoneIcon>
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
