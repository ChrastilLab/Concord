import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Textarea,
  Stack,
  Input,
} from "@chakra-ui/react";

import { PlusIcon } from "@heroicons/react/24/outline";

export default function NewOrgForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<PlusIcon width={"20px"} />}
        width={"180px"}
        height={"35px"}
        fontSize={"16px"}
        marginTop={"400px"}
        onClick={onOpen}
      >
        Create New Org
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={"600px"}>
          <ModalHeader textAlign="center" fontSize={"25px"} marginTop={"20px"}>
            New Organization
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={"80px"}>
            <Stack spacing={"15px"}>
              <Text fontWeight={"medium"}>Organization Name</Text>
              <Input placeholder="..." size="md" />
              <Text fontWeight={"medium"}>Organization Lead</Text>
              <Input placeholder="..." size="md" />
              <Text fontWeight={"medium"}>Organization Description</Text>
              <Textarea placeholder="" />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost">Cancel</Button>

            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
