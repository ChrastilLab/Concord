import {
    EditIcon,
} from '@chakra-ui/icons';
import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure, FormControl, FormLabel, Input,Textarea,
} from '@chakra-ui/react'
import {useSession} from "@supabase/auth-helpers-react";

function EditAccountInfo() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const session = useSession();

    return (
        <>
            <Button position={"absolute"}
                    right={"10px"}
                    top={"15px"}
                    _hover={"None"}
                    _active={"None"}
                    backgroundColor={"#4498ec"}
                    onClick={onOpen}>
                <EditIcon color={"white"} boxSize={'25px'}/>
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Account Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel color={"#3179b8"}>Full name</FormLabel>
                            <Input variant='flushed' placeholder="type your name" />
                        </FormControl>

                        <FormControl mt={8}>
                            <FormLabel color={"#3179b8"}>E-mail</FormLabel>
                            <Input variant='flushed' placeholder={session.user.email} disabled/>
                        </FormControl>

                        <FormControl mt={8}>
                            <FormLabel color={"#3179b8"}>Status</FormLabel>
                            <Input variant='flushed' defaultValue='Programming...' />
                        </FormControl>

                        <FormControl mt={8}>
                            <FormLabel color={"#3179b8"}>Description</FormLabel>
                            <Textarea variant='flushed' defaultValue="This is the description part. I am a student from UCI, working as a developer in this project." />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditAccountInfo;