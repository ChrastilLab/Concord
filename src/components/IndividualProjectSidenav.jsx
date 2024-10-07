import { Flex, Button, Stack, Text } from "@chakra-ui/react";

/* Icons */
import "bootstrap-icons/font/bootstrap-icons.css";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import FeedbackOutlined from "@mui/icons-material/FeedbackOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { useEffect, useState } from "react";
import { ReactComponent as MdOutlineMapsHomeWork } from "./img/MdOutlineMapsHomeWork.svg";

function IndividualProjectSidenav({ organization_id, project_id, project_name }) {
  const navigate = useNavigate();
  let iconStyle = { height: "20px", width: "20px", marginRight: "3.5%" };
  let thinIconStyle = {
    height: "20px",
    width: "20px",
    marginRight: "3.5%",
    stroke: "#ffffff",
    strokeWidth: 0.5,
  };

  const [organization, setOrganization] = useState("");

  useEffect(() => {
    const fetchOrganization = async () => {
      const { data, error } = await supabase
        .from("Organizations")
        .select("organization_name")
        .eq("organization_id", organization_id);

      if (!error) {
        setOrganization(data[0]);
      }
    };

    fetchOrganization();
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      h={"100%"}
      w={"15%"}
      bg={"#F4F4F4"}
    >
      <Stack spacing={2} marginTop={"10%"}>
        {/* Todo: the navigation to member, tasks, documents, calendar pages should be specific to this project */}
        <Button
          onClick={() => navigate(`/studies/${organization_id}`)}
          justifyContent={"left"}
          variant={"ghost"}
          _hover={{ bg: "#D0EAF9" }}
        >
          {<MdOutlineMapsHomeWork style={thinIconStyle} />}{" "}
          <Text overflow="hidden">{organization.organization_name}</Text>{" "}
        </Button>
        <Button
          onClick={() => navigate(`/studies/${organization_id}/${project_id}`)}
          justifyContent={"left"}
          variant={"ghost"}
          _hover={{ bg: "#D0EAF9" }}
        >
          {<KeyboardArrowDownIcon style={iconStyle} />}
          <Text overflow="hidden">{project_name}</Text>
        </Button>
        <Button
          onClick={() => navigate("/tasks")}
          ml={"9%"}
          justifyContent={"left"}
          variant={"ghost"}
          _hover={{ bg: "#D0EAF9" }}
        >
          {<FeedbackOutlined style={thinIconStyle} />}{" "}
          <Text overflow="hidden">Tasks</Text>
        </Button>
        <Button
          onClick={() => navigate("/folder")}
          ml={"9%"}
          justifyContent={"left"}
          variant={"ghost"}
          _hover={{ bg: "#D0EAF9" }}
        >
          {<BookOpenIcon style={iconStyle} />}{" "}
          <Text overflow="hidden">Documents</Text>
        </Button>
        <Button
          onClick={() => navigate("/calendar")}
          ml={"9%"}
          justifyContent={"left"}
          variant={"ghost"}
          _hover={{ bg: "#D0EAF9" }}
        >
          {<CalendarMonthIcon style={thinIconStyle} />}
          <Text overflow="hidden">Calendar</Text>
        </Button>
        <Button
          onClick={() => navigate("/members")}
          ml={"9%"}
          justifyContent={"left"}
          variant={"ghost"}
          _hover={{ bg: "#D0EAF9" }}
        >
          {<i className="bi bi-people" style={iconStyle} />}
          <Text overflow="hidden">Members</Text>
        </Button>
      </Stack>
      <Button justifyContent={"left"} variant={"ghost"}>
        {<SettingOutlined style={iconStyle} />} Settings
      </Button>
    </Flex>
  );
}

export default IndividualProjectSidenav;
