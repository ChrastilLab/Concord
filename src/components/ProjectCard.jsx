import {Box, Card, Spacer, Button, Badge, IconButton, CardBody, HStack, CardHeader, CardFooter, Heading, Flex, Image, Text, Stack} from "@chakra-ui/react"
import "bootstrap-icons/font/bootstrap-icons.css";
import {InfoIcon} from '@chakra-ui/icons';

function ProjectCard() {
    return (
        <Flex mt={'5vh'} flexDirection={'column'} justifyContent={'space-between'} w={'380px'} bg={'#F4F4F4'}>
            <Card borderRadius="md" boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"   p={2} bg="#F0F0F0" >
                <CardHeader p={2} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                        <Heading size='md' mb={1}>Project One</Heading> 
                        <Text>Lead: Emily Johnson</Text>
                    </Box>
                    <Badge bg="#E53E3E" 
                        color="white"  fontSize='small' fontWeight='none'display="flex" borderRadius={'0.5vh'} alignItems="center" paddingLeft={'1vh'} textTransform="none">
                        In progress <Box as="span" ml={1} className="bi bi-x" />
                    </Badge>
                </CardHeader >
                <CardBody p={2}>
                    
                    <Text textColor='#A39999'>A research study on anteaters and the size of their noses...</Text>
                </CardBody>
                <CardFooter p={2}>
                    <HStack w="100%">
                        <Text >Created on: <Text textColor='#A39999'as="span">Jan 7, 2024</Text></Text>
                        <Spacer />
                        <IconButton 
                            icon={<InfoIcon />} 
                            aria-label="Information" 
                            size="lg"
                            fontSize="24px" 
                            padding="0" 
                            minWidth="40px"
                            minHeight="40px" 
                            variant="ghost"
                        />
                    </HStack>
                </CardFooter>
            </Card>
        </Flex>
    )
}

export default ProjectCard;
