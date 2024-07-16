import {
    Flex,
    Button,
    Stack
} from "@chakra-ui/react"
/* Icons */
import "bootstrap-icons/font/bootstrap-icons.css";
import {HomeOutlined} from "@ant-design/icons"
import {BookOpenIcon} from '@heroicons/react/24/outline'
import FeedbackOutlined from "@mui/icons-material/FeedbackOutlined"
import ChatOutlined from "@mui/icons-material/ChatOutlined"
import { SettingOutlined } from "@ant-design/icons";

function Sidenav() {
    let navOptions = ['Home', 'Studies', 'Announcements', 'Discussions', 'Members', 'Lab Sheet']
    let iconStyle = { height: '20px', width: '20px', marginRight: '8px'}
    let thinIconStyle = { height: '20px', width: '20px', marginRight: '8px', stroke: "#ffffff", strokeWidth: 0.5 }
    let icons = [<HomeOutlined style={thinIconStyle} />, <BookOpenIcon style={iconStyle}/>, <FeedbackOutlined style={thinIconStyle} />, <ChatOutlined style={thinIconStyle}/>, <i className="bi bi-people" style={iconStyle}></i>, <i className="bi bi-file-earmark-spreadsheet" style={iconStyle}></i>]

    return(
        <Flex flexDirection={'column'} justifyContent={'space-between'} h={'100%'} w={'250px'} bg={'#F4F4F4'}>
            <Stack id={"buttonGroup"} spacing={2} marginTop={'25px'}>
                { navOptions.map((item, index) => <Button key={index} justifyContent={'left'} variant={'ghost'}  _hover={{ bg: "#D0EAF9" }}>{icons[index]} {item}</Button>) }
            </Stack>
            <Button justifyContent={'left'} variant={'ghost'}>
                {<SettingOutlined style={iconStyle}/>} Settings
            </Button>
            
        </Flex>
    )
}

export default Sidenav
