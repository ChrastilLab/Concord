import React from "react";

import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Stack,
  Button,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import {
  EllipsisVerticalIcon,
  MegaphoneIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function OrganizationCard({
  organization,
  description,
  color_scheme,
  labSheetUrl,
}) {
  const toast = useToast();

  const navigate = useNavigate();

  function handleFolderClicked(event) {
    event.stopPropagation();
    console.log(labSheetUrl);
    if (!labSheetUrl) {
      toast({
        title: "Lab Sheet not exists.",
        description: "The lab sheet hasn't been created.",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "bottom-left",
      });
    }

    navigate(labSheetUrl);
  }

  console.log(labSheetUrl);
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
            {/* <Button
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
            </Button> */}

            <Button
              variant={"link"}
              color={"black"}
              _hover={{ color: "#C0C0C0" }}
              width={"20px"}
              minWidth={"20px"}
              onClick={(e) => handleFolderClicked(e)}
            >
              <DocumentChartBarIcon
                style={{
                  height: "20px",
                  width: "20px",
                }}
              ></DocumentChartBarIcon>
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default OrganizationCard;
