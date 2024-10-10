import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../config/supabase";

function AddTodoModal({ onUpdate }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const session = useSession();
    const toast = useToast();
    const [name, setName] = useState("");


    const handleSave = async () => {
        try {
            const { data, error } = await supabase
                .from("ToDos")
                .insert([
                    {
                        user_id: session.user.id,
                        to_do: name,
                        completed: false,
                    },
                ]);

            if (error) {
                console.error("Error adding todos: ", error);
            } else {
                toast({
                    title: "Success!",
                    description:
                        "Your successfully created a new TODO!",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                });
                onUpdate();
                onClose();
            }
        } catch (error) {
            console.error("Error saving data:", error);
            toast({
                title: "Error",
                description: "There was an error saving your data.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <AddIcon
                boxSize={6}
                backgroundColor={"lightgreen"}
                borderRadius={"100%"}
                padding={3}
                position={"absolute"}
                top={"23%"}
                right={"7%"}
                width={10}
                height={10}
                onClick={onOpen}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adding Todo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel color={"black"}>Todo Name</FormLabel>
                            <Input
                                defaultValue={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddTodoModal;
