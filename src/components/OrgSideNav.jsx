import { Flex, Button, Stack, Text } from "@chakra-ui/react";
import { SettingOutlined } from "@ant-design/icons";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function OrgSideNav({ organizations }) {
  let iconStyle = { height: "20px", width: "20px", marginRight: "8px" };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      h={"100%"}
      w={"220px"}
      bg={"#F4F4F4"}
    >
      <Stack id={"buttonGroup"} spacing={2} marginTop={"25px"}>
        {organizations.map((org) => (
          <Button
            leftIcon={<ChevronRightIcon width={"12px"} />}
            justifyContent={"left"}
            variant={"ghost"}
            _hover={{ bg: "#D0EAF9" }}
          >
            <Text isTruncated>{org.name}</Text>
          </Button>
        ))}
      </Stack>

      <Button justifyContent={"left"} variant={"ghost"}>
        {<SettingOutlined style={iconStyle} />} Settings
      </Button>
    </Flex>
  );
}
