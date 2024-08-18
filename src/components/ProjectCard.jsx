import {Box, Card, Spacer, Button, Badge, IconButton, CardBody, HStack, CardHeader, CardFooter, Heading, Flex, Image, Text, Stack} from "@chakra-ui/react"
import "bootstrap-icons/font/bootstrap-icons.css";
// import {InfoIcon} from '@chakra-ui/icons';

function ProjectCard({ project }) {
    return (
        <Flex mt={'5vh'} flexDirection={'column'} justifyContent={'space-between'} w={'44vh'} h='22vh' bg={'#F4F4F4'}>
            <Card borderRadius="md" boxShadow="0 4px 6px rgba(0, 0, 0, 0.3)"  h='full' p={2} bg="#F0F0F0" >
                <CardHeader p={2} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                        <Heading size='md' mb={1}>{project.project_name}</Heading> 
                        <Text>Lead: {project.project_lead}</Text>
                    </Box>
                    <Badge bg={ project.status == "In Progress" ? "#4299E1" : project.status == "Completed" ? "#48BB78" : "#A0AEC0"}
                        color="white"  fontSize='small' fontWeight='none'display="flex" borderRadius={'0.5vh'} alignItems="center" paddingLeft={'1vh'} textTransform="none">
                        {project.status} <Box as="span" ml={1} className="bi bi-x" />
                    </Badge>
                </CardHeader>
                <CardBody p={2}>
                    
                    <Text w='75%' textColor='#A39999'>{project.description}</Text>
                </CardBody>
                <CardFooter p={2}>
                    <HStack w="100%">
                        <Text >Created on: <Text textColor='#A39999'as="span">{project.created_at}</Text></Text>
                        <Spacer />
                        {/* <IconButton 
                            icon={<InfoIcon />} 
                            aria-label="Information" 
                            size="lg"
                            fontSize="24px" 
                            padding="0" 
                            minWidth="40px"
                            minHeight="40px" 
                            variant="ghost"
                        /> */}
                    </HStack>
                </CardFooter>
            </Card>
        </Flex>
    )
}

export default ProjectCard;
