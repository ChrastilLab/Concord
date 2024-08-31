import {
    Flex,
    Button,
    Stack,
    Box,
} from "@chakra-ui/react"


/* Icons */
import "bootstrap-icons/font/bootstrap-icons.css";
import {HomeOutlined} from "@ant-design/icons"
import {BookOpenIcon} from '@heroicons/react/24/outline'
import FeedbackOutlined from "@mui/icons-material/FeedbackOutlined"
import ChatOutlined from "@mui/icons-material/ChatOutlined"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { ReactComponent as MdOutlineMapsHomeWork } from  "./img/MdOutlineMapsHomeWork.svg";

function IndividualProjectSidenav({organization, project}) {

    const navigate = useNavigate();
    let iconStyle = { height: '20px', width: '20px', marginRight: '8px'}
    let thinIconStyle = { height: '20px', width: '20px', marginRight: '8px', stroke: "#ffffff", strokeWidth: 0.5 }
    
    return(
        <Flex flexDirection={'column'} justifyContent={'space-between'} h={'100%'} w={'250px'} bg={'#F4F4F4'}>
            <Stack spacing={2} marginTop={'25px'}>
                {/* Todo: the navigation to member, tasks, documents, calendar pages should be specific to this project */}
                <Button onClick={() => navigate(`/studies/${organization}`)} justifyContent={'left'} variant={'ghost'}  _hover={{ bg: "#D0EAF9" }}>{<MdOutlineMapsHomeWork style={thinIconStyle}/>} {organization}</Button>
                <Button onClick={() => navigate(`/studies/${organization}/${project}`)} justifyContent={'left'} variant={'ghost'} _hover={{ bg: "#D0EAF9" }}>{<KeyboardArrowDownIcon style={iconStyle}/>} {project}</Button>
                <Button onClick={() => navigate('/tasks') } ml={'25px'} justifyContent={'left'} variant={'ghost'} _hover={{ bg: "#D0EAF9" }}>{<FeedbackOutlined style={thinIconStyle}/>} Tasks</Button>
                <Button onClick={() => navigate('/documents')} ml={'25px'} justifyContent={'left'} variant={'ghost'} _hover={{ bg: "#D0EAF9" }}>{<BookOpenIcon style={iconStyle}/>} Documents</Button>
                <Button onClick={() => navigate('/calendar')} ml={'25px'} justifyContent={'left'} variant={'ghost'} _hover={{ bg: "#D0EAF9" }}>{<CalendarMonthIcon style={thinIconStyle}/>} Calendar</Button>
                <Button onClick={() => navigate('/members')} ml={'25px'} justifyContent={'left'} variant={'ghost'} _hover={{ bg: "#D0EAF9" }}>{<i className="bi bi-people" style={iconStyle} />} Members</Button>
            </Stack>
            <Button justifyContent={'left'} variant={'ghost'}>
                {<SettingOutlined style={iconStyle}/>} Settings
            </Button>
            
        </Flex>
    )
}

export default IndividualProjectSidenav
