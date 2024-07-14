import {
    Flex,
    Button,
    Stack
} from "@chakra-ui/react"
function Sidenav() {
    let navOptions = ['Home', 'Studies', 'Announcements']

    return(
        <Flex flexDirection={'column'} justifyContent={'space-between'} h={'100%'} w={'250px'} bg={'#F4F4F4'}>
            <Stack id={"buttonGroup"} spacing={2}>
                { navOptions.map((item) => <Button variant={'ghost'}>{item}</Button>) }
            </Stack>
            <Button variant={'ghost'}>
                Settings
            </Button>
        </Flex>
    )
}

export default Sidenav