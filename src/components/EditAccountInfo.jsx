import { EditIcon } from "@chakra-ui/icons";
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
  Textarea,
  AlertIcon,
  Alert,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../config/supabase";

function EditAccountInfo({ updateUserDataFromEdit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSession();
  const toast = useToast();

  const [name, setName] = useState(localStorage.getItem("username") || "");
  const [bio, setBio] = useState(localStorage.getItem("userbio") || "");
  const [status, setStatus] = useState(
    localStorage.getItem("userstatus") || ""
  );

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .update({
          display_name: name,
          bio: bio,
          status: status,
        })
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error updating user data: ", error);
      } else {
        const updatedData = { name: name, bio: bio, status: status };
        updateUserDataFromEdit(updatedData);
        localStorage.setItem("username", name);
        localStorage.setItem("userbio", bio);
        localStorage.setItem("userstatus", status);

        toast({
          title: "Success!",
          description:
            "Your account information has been successfully updated!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

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
      <Button
        position={"absolute"}
        right={"10px"}
        top={"15px"}
        _hover={"None"}
        _active={"None"}
        backgroundColor={"#4498ec"}
        onClick={onOpen}
      >
        <EditIcon color={"white"} boxSize={"25px"} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Account Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"black"}>Full name</FormLabel>
              <Input
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={8}>
              <FormLabel color={"black"}>E-mail</FormLabel>
              <Input placeholder={session.user.email} disabled />
            </FormControl>

            <FormControl mt={8}>
              <FormLabel color={"black"}>Status</FormLabel>
              <Input
                defaultValue={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </FormControl>

            <FormControl mt={8}>
              <FormLabel color={"black"}>Description</FormLabel>
              <Textarea
                defaultValue={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
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
