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

import { AddBox } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";
import { supabase } from "../config/supabase";
import { useState } from "react";

export default function NewOrgForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newData, setNewData] = useState({
    organization_name: "",
    leader: "",
    description: "",
  });

  async function handleSaveClicked() {
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
        fontSize={"16px"}
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
                placeholder="..."
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
                placeholder="..."
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
                placeholder="..."
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
              variant="solid"
              leftIcon={<AddBox fontSize="15px" />}
              width={"100px"}
              onClick={handleSaveClicked}
            >
              Save
            </Button>

            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              leftIcon={<Cancel fontSize="15px" />}
              width={"100px"}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
