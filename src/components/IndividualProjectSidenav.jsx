import { Flex, Button, Stack, Text } from "@chakra-ui/react";

/* Icons */
import "bootstrap-icons/font/bootstrap-icons.css";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import FeedbackOutlined from "@mui/icons-material/FeedbackOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SettingOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as MdOutlineMapsHomeWork } from "./img/MdOutlineMapsHomeWork.svg";

function IndividualProjectSidenav({ organization, project_name }) {
  const navigate = useNavigate();
  const location = useLocation();

  let iconStyle = { height: "20px", width: "20px", marginRight: "3.5%" };
  let thinIconStyle = {
    height: "20px",
    width: "20px",
    marginRight: "3.5%",
    stroke: "#ffffff",
    strokeWidth: 0.5,
  };

  const isDocumentsPage = location.pathname.includes("/documents");

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
          onClick={() => navigate(`/studies/${organization}`)}
          justifyContent={"left"}
          variant={"ghost"}
          _hover={{ bg: "#D0EAF9" }}
        >
          {<MdOutlineMapsHomeWork style={thinIconStyle} />}{" "}
          <Text overflow="hidden">{organization}</Text>{" "}
        </Button>
        <Button
          onClick={() => navigate(`/studies/${organization}/${project_name}`)}
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
          onClick={() => navigate(`/studies/${organization}/${project_name}/documents`)}
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
      {!isDocumentsPage && (
        <Button justifyContent={"left"} variant={"ghost"}>
          {<SettingOutlined style={iconStyle} />} Settings
        </Button>
      )}
    </Flex>
  );
}

export default IndividualProjectSidenav;
