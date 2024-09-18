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
  useToast,
} from "@chakra-ui/react";

import { PlusIcon } from "@heroicons/react/24/outline";

import { supabase } from "../config/supabase";
import { useState } from "react";

export default function NewOrgForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newData, setNewData] = useState({
    organization_name: "",
    leader: "",
    description: "",
  });

  async function handleSaveClicked() {
    if (!newData.organization_name || !newData.leader || !newData.description) {
      toast({
        title: "Cannot Created.",
        description: "Please provide all of the organization information.",
        status: "error",
        duration: 1500,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    newData.color_scheme = randomColor;

    const { error } = await supabase.from("Organizations").insert(newData);

    if (!error) {
      setNewData({ organization_name: "", leader: "", description: "" }); // reset the default data
    }
    onClose();
  }

  return (
    <>
      <Button
        leftIcon={<PlusIcon width={"20px"} />}
        width={"180px"}
        height={"35px"}
        fontSize={"15px"}
        marginTop={"400px"}
        onClick={onOpen}
      >
        Create New Org
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg={"blackAlpha.300"} backdropFilter={"blur(5px)"} />
        <ModalContent minWidth={"600px"}>
          <ModalHeader textAlign="center" fontSize={"25px"} marginTop={"20px"}>
            New Organization
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={"80px"}>
            <Stack spacing={"15px"}>
              <Text fontWeight={"medium"}>Organization Name</Text>
              <Input
                placeholder="Spatial Neuroscience Lab"
                size="md"
                value={newData.organization_name}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    organization_name: e.target.value,
                  })
                }
                maxWidth={"480px"}
              />
              <Text fontWeight={"medium"}>Organization Lead</Text>
              <Input
                placeholder="Peter Anteater"
                size="md"
                value={newData.leader}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    leader: e.target.value,
                  })
                }
                maxWidth={"480px"}
              />
              <Text fontWeight={"medium"}>Organization Description</Text>
              <Textarea
                placeholder="This is a lab organization..."
                value={newData.description}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    description: e.target.value,
                  })
                }
                maxWidth={"525px"}
              />
            </Stack>
          </ModalBody>

          <ModalFooter gap={"10px"}>
            <Button
              colorScheme="green"
              variant="solid"
              onClick={handleSaveClicked}
            >
              Create Organization
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
