import React from "react";
import { useParams } from 'react-router-dom';
import { supabase } from "../config/supabase";
import IndividualProjectHeader from "../components/IndividualProjectHeader";
import IndividualProjectSidenav from "../components/IndividualProjectSidenav"
import { Box, Grid, GridItem, Flex, Spacer, Card, CardBody, CardHeader, HStack, VStack, Text, Button, ButtonGroup, Divider} from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { ReactComponent as CheckEdit} from "../components/img/CkEdit.svg";
import { ReactComponent as Pin} from "../components/img/AiOutlinePushpin.svg";

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";


function IndividualProject() {

  const { organization, project } = useParams();
  const { isLoading } = useSessionContext();

  const session = useSession();

  return(
        <Flex flexDirection={'column'} height={'100vh'}>
            <IndividualProjectHeader />
            {
                session ? (
                    <Box flex={1} display={'flex'} flexDirection={'row'} zIndex={1}>
                      <IndividualProjectSidenav organization={organization} project={project}/>
                      <Flex pl={'65px'} pt={'51px'} pr={'65px'} flex={1} flexDirection={'column'}>
                        <Flex flex={1} flexDirection={'column'}>
                            <HStack spacing={'50px'}>
                                <Card w={'550px'} h={'400px'} borderRadius="20px" boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"  h='full' p={2} bg="#F0F0F0">
                                    <CardHeader pt={2} pb={0} display='flex' justifyContent='flex-end'>
                                        <Button bg="#F0F0F0"><CheckEdit/></Button>
                                    </CardHeader>
                                    <CardBody pl={'35px'} pb={'60px'} pt={0} display='flex' justifyContent='flex-start'>
                                        <VStack alignItems={'left'} spacing={3}>
                                            <Text fontSize={'36px'} fontFamily={'Inter'} fontStyle={'normal'} fontWeight={600} lineHeight={'30px'}>IndivRobotics</Text>
                                            <Text color = {'#565656'} fontSize={'14px'} fontFamily={'Inter'} fontStyle={'normal'} fontWeight={400} lineHeight={'24px'}>Led By: Taylor</Text>
                                            <Text fontSize={'14px'} fontFamily={'Inter'} fontStyle={'normal'} fontWeight={700} lineHeight={'10px'}>IRB Number: #2020-6048</Text>
                                            <Text fontSize={'20px'} fontFamily={'Inter'} fontStyle={'normal'} fontWeight={400} lineHeight={'24px'} pt={'15px'}>IndivRobotics aims to create personalized and customizable robots for each member while allowing the user to create their own team,  color, and so on..</Text>
                                        </VStack>
                                    </CardBody>
                                </Card >
                                <Card w={'750px'} h={'400px'} borderRadius="20px" boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"  h='full' p={2} bg="#F0F0F0">
                                    <CardHeader pt={'30px'} pb={'20px'}>
                                        <ButtonGroup display='flex' justifyContent='space-between'>
                                        {['GOAL', 'TESTING', 'HYPOTHESIS', 'EXPECTATIONS'].map((aspect) => (
                                            <Button bg="#F0F0F0">
                                                <Text fontSize={'23px'} fontFamily={'Inter'} fontStyle={'normal'} fontWeight={600} lineHeight={'24px'}>{aspect}</Text>
                                            </Button>
                                        ))}
                                        </ButtonGroup>
                                    </CardHeader>
                                    <Divider width={'630px'} alignSelf={'center'} color='gray'/>
                                    <CardBody pt={'30px'} pl={'50px'} pr={'50px'} pb={'50px'}>
                                        <Text fontSize={'20px'} fontFamily={'Inter'} fontStyle={'normal'} fontWeight={400} lineHeight={'24px'}>
                                        To test the advantages o    f varying navigational abilities in  humans and robots using
                                        To test the advantages of varying navigational abilities in  humans and robots using
                                        To test the advantages of varying navigational abilities in  humans and robots using
                                        To test the advantages of varying navigational abilities in  humans and robots using
                                        To test the advantages of varying navigational abilities in  humans and robots using
                                        To test the advantages of varying navigational abilities in  humans and robots using
                                        </Text>
                                    </CardBody>
                                </Card>
                            </HStack>
                        </Flex>
                        <Flex flex={1} pt={'58px'} flexDirection={'column'}>
                            <HStack spacing={'14px'}>
                                <Pin/>
                                <Text fontSize={'20px'} fontFamily={'Inter'} fontStyle={'normal'} fontWeight={400} lineHeight={'24px'}>Pinned Documents</Text>
                            </HStack>
                            <Divider width={'1350px'} pt={'25px'} color='black'/>
                            <Grid templateColumns='repeat(4, 1fr)' gap={6} pt={'25px'}>
                                <GridItem>Documents</GridItem>
                                <GridItem>Documents</GridItem>
                                <GridItem>Documents</GridItem>
                                <GridItem>Documents</GridItem>
                                <GridItem>Documents</GridItem>
                                <GridItem>Documents</GridItem>
                                <GridItem>Documents</GridItem>
                                <GridItem>Documents</GridItem>
                            </Grid>
                        </Flex>
                    </Flex>
                    </Box>
                ) : (
                    <div>
                        Not logged in
                    </div>
                )
            }
        </Flex>
    )
}


export default IndividualProject;