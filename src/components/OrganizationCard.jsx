import React from "react";

import {Box, Card, CardBody, Heading, Image, Text, Stack} from "@chakra-ui/react"

function OrganizationCard() {
    return (
        <Card maxW='sm' marginTop="65px" width={"304px"}>
            <CardBody>
                <Box bgColor={"blue"} height={"120px"} padding={"0px"} margin={"0px"}></Box>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Living room Sofa</Heading>
                    <Text fontSize={"12px"}>
                        This sofa is perfect for modern tropical spaces, baroque inspired
                        spaces, earthy toned spaces and for people who love a chic design with a
                        sprinkle of vintage design.
                    </Text>
                    <Text color='blue.600' fontSize='md'>
                        Super Cute
                    </Text>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default OrganizationCard
