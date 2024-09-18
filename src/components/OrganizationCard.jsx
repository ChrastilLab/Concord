import React, { useState } from "react";

import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  SimpleGrid,
  Center,
  Input,
} from "@chakra-ui/react";

import {
  EllipsisVerticalIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function OrganizationCard({
  organization,
  description,
  color_scheme,
  labSheetUrl,
}) {
  const toast = useToast();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();

  const colors = [
    "#E76F51",
    "#F7A399",
    "#D4A5A5",
    "#F4A261",
    "#E9C46A",
    "#85A392",
    "#2A9D8F",
    "#6A4C93",
    "#264653",
    "#005477",
  ];

  const [color, setColor] = useState(color_scheme);

  function handleDocClicked(event) {
    event.stopPropagation();
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

  async function handleChangeColor(color) {
    setColor(color);
    const { error } = await supabase
      .from("Organizations")
      .update({ color_scheme: color })
      .eq("organization_name", organization);
  }

  return (
    <Card
      maxW="sm"
      width={"270px"}
      height={"250px"}
      position={"relative"}
      _hover={{
        transform: "scale(1.05)",
        transition: "transform .3s",
        zIndex: 10,
      }}
      onClick={() => navigate(`/studies/${organization}`)}
    >
      <Box bgColor={color} height={"135px"} padding={"0px"} margin={"0px"}>
        <Popover>
          <PopoverTrigger>
            <Button
              variant={"link"}
              width={"50px"}
              mt={"5px"}
              position="absolute"
              top={"10px"}
              right={"5px"}
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVerticalIcon
                style={{
                  height: "30px",
                  width: "30px",
                  color: "white",
                }}
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent width="170px" onClick={(e) => e.stopPropagation()}>
            <PopoverArrow bg={color} />
            <PopoverCloseButton color={"white"} />
            <PopoverHeader
              height="70px"
              backgroundColor={color}
              borderTopLeftRadius={5}
              borderTopRightRadius={5}
            >
              <Center height={"100%"} color={"white"}>
                {color}
              </Center>
            </PopoverHeader>

            <PopoverBody>
              <SimpleGrid columns={5} spacing={2}>
                {colors.map((c) => (
                  <Button
                    background={c}
                    height="22px"
                    width="22px"
                    padding={0}
                    minWidth="unset"
                    borderRadius={3}
                    onClick={() => handleChangeColor(c)}
                  ></Button>
                ))}
              </SimpleGrid>

              <Input
                size={"sm"}
                mt={"10px"}
                value={color}
                placeholder="#E76F51"
                onChange={(e) => handleChangeColor(e.target.value)}
              ></Input>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
      <CardBody>
        <Stack spacing="2">
          <Heading size="md" color={color} isTruncated>
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
              onClick={(e) => handleDocClicked(e)}
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
