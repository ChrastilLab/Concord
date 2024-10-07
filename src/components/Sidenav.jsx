import {
  Flex,
  Button,
  Stack,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
/* Icons */
import "bootstrap-icons/font/bootstrap-icons.css";
import { HomeOutlined } from "@ant-design/icons";
// import { BookOpenIcon } from "@heroicons/react/24/outline";
// import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import FeedbackOutlined from "@mui/icons-material/FeedbackOutlined";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";

function Sidenav() {
  const navigate = useNavigate();
  const organization_id = useParams().organization_id;

  const [organization, setOrganization] = useState("");

  useEffect(() => {

    const fetchOrganization = async () => {
      const { data, error } = await supabase
        .from("Organizations")
        .select("*")
        .eq("organization_id", organization_id);

      if (!error) {
        setOrganization(data[0]);
      }
    };
    
    fetchOrganization();
  }, [organization_id]);

  let navOptions = [
    // "Studies",
    // "Tasks",
    "Announcements",
    "Discussions",
    "Members",
    "Lab Sheet",
  ];
  let navRoutes = [
    // `/${organization}/studies`,
    // `/${organization}/tasks`,
    `/${organization_id}/announcements`,
    `/${organization_id}/discussions`,
    `/${organization_id}/members`,
    `/${organization_id}/labsheet`,
  ];
  let iconStyle = { height: "20px", width: "20px", marginRight: "8px" };
  let thinIconStyle = {
    height: "20px",
    width: "20px",
    marginRight: "8px",
    stroke: "#ffffff",
    strokeWidth: 0.5,
  };
  let icons = [
    // <BookOpenIcon style={iconStyle} />,
    // <CalendarDateRangeIcon style={iconStyle} />,
    <FeedbackOutlined style={thinIconStyle} />,
    <ChatOutlined style={thinIconStyle} />,
    <i className="bi bi-people" style={iconStyle}></i>,
    <i className="bi bi-file-earmark-spreadsheet" style={iconStyle}></i>,
  ];

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      h={"100%"}
      w={"250px"}
      bg={"#F4F4F4"}
    >
      <Stack>
        <Button
          onClick={() => navigate("/")}
          justifyContent={"left"}
          variant={"ghost"}
          _hover={{ bg: "#D0EAF9" }}
          marginTop={"25px"}
        >
          {<HomeOutlined style={thinIconStyle} />} {"Dashboard"}
        </Button>
        <Accordion defaultIndex={[0]} allowMultiple paddingLeft={"10px"}>
          <AccordionItem border="none">
            <AccordionButton
              _hover={{ bg: "#D0EAF9" }}
              borderRadius="8px"
              width={"95%"}
            >
              <AccordionIcon marginRight={"10px"} marginLeft={"-10px"} />

              <Box as="span" flex="1" textAlign="left" fontWeight={"medium"}>
                {organization.organization_name}
              </Box>
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Stack id={"buttonGroup"} spacing={2}>
                {navOptions.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => navigate(navRoutes[index])}
                    justifyContent={"left"}
                    variant={"ghost"}
                    _hover={{ bg: "#D0EAF9" }}
                  >
                    {icons[index]} {item}
                  </Button>
                ))}
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>

      <Button justifyContent={"left"} variant={"ghost"}>
        {<SettingOutlined style={iconStyle} />} Settings
      </Button>
    </Flex>
  );
}

export default Sidenav;
