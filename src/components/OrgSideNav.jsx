import { Flex, Button, Stack, Text } from "@chakra-ui/react";
import { SettingOutlined } from "@ant-design/icons";
import { UsersIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function OrgSideNav({ organizations }) {
  const navigate = useNavigate();
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
            leftIcon={<UsersIcon width={"17px"} />}
            justifyContent={"left"}
            variant={"ghost"}
            _hover={{ bg: "#D0EAF9" }}
            onClick={() => navigate(`/studies/${org.organization_name}`)}
          >
            <Text fontWeight={"normal"} isTruncated>
              {org.organization_name}
            </Text>
          </Button>
        ))}
      </Stack>

      <Button justifyContent={"left"} variant={"ghost"}>
        {<SettingOutlined style={iconStyle} />} Settings
      </Button>
    </Flex>
  );
}
