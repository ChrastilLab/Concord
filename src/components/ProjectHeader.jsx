import {Card, Button, CardBody, HStack, CardHeader, Heading, Flex, Image, Text, Stack} from "@chakra-ui/react"
import "bootstrap-icons/font/bootstrap-icons.css";
// import {InfoIcon} from '@chakra-ui/icons';
import Check from './img/Check.png';
import Progress from './img/Progress.png';
import { FolderOutlined } from '@ant-design/icons';

function ProjectHeader() {
    return (
        <Flex mt={'5vh'} flexDirection={'column'} justifyContent={'space-between'}  w={'154vh'} bg={'#F4F4F4'}>
            <Card  direction={{ base: 'column', sm: 'row' }} borderRadius="md" h='25vh' boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"   p={2} bg="#F0F0F0" >
                <CardHeader p={2} display="flex" justifyContent="space-between" alignItems="center">
                <Stack ml={'2vh'} mb={3} w='45vh' spacing={3}>
                        <Heading size='lg' >Your Projects</Heading> 
                        
                        <Text mb={6}>Here is where all your projects are listed. You can
                        create a new one by clicking the button below.</Text>
                        
                        <Button fontSize='14' w='26vh'  bg='black' color='white'>Create New Study</Button>
                    </Stack>
                    
                </CardHeader >
                <CardBody ml='22vh' alignContent={'center'} p={2}>
                    <HStack spacing={10}>
                    <Flex  alignItems={'center'} justifyContent={'center'}  bg={'#FFFDFD'} borderRadius='1vh' w='22vh' h='19vh'>
                        <Stack mt={6} alignItems={'center'} justifyContent={'center'}>
                            <Image h={'4vh'} w={'4vh'} src={Check}></Image>
                            <Text fontWeight={'bold'}>Projects Done</Text>
                            <Text fontSize='35' fontWeight={'bold'}>21</Text>
                        </Stack>
                    </Flex>
                    <Flex  alignItems={'center'} justifyContent={'center'}  bg={'#FFFDFD'} borderRadius='1vh' w='22vh' h='19vh'>
                        <Stack mt={4} alignItems={'center'} justifyContent={'center'}>
                            <Image ml='3' h={'5vh'} w={'6vh'} src={Progress}></Image>
                            <Text fontWeight={'bold'}>In Progress</Text>
                            <Text fontSize='35' fontWeight={'bold'}>5</Text>
                        </Stack>
                    </Flex>
                    <Flex  alignItems={'center'} justifyContent={'center'}  bg={'#FFFDFD'} borderRadius='1vh' w='22vh' h='19vh'>
                        <Stack mt={7} alignItems={'center'} justifyContent={'center'}>
                            <FolderOutlined style={{fontSize: '4vh'}} />
                            <Text fontWeight={'bold'}>Total Projects</Text>
                            <Text fontSize='35' fontWeight={'bold'}>32</Text>
                        </Stack>
                    </Flex>
                    </HStack>
                </CardBody>
                
            </Card>
        </Flex>
    )
}

export default ProjectHeader;
