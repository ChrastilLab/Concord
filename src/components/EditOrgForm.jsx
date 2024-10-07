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
  
  import { PencilSquareIcon } from "@heroicons/react/24/outline";
  
  import { supabase } from "../config/supabase";
  import { useState, useEffect } from "react";
  
  export default function NewOrgForm({organization_id}) {

    const [orgData, setOrgData] = useState({});
    const [loading, setLoading] = useState(true);


    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("Organizations")
          .select("*")
          .eq("organization_id", organization_id);
  
        if (!error) {
          setOrgData(data[0]);
          // console.log(data[0]);
        }
        setLoading(false);
      };
  
      fetchData();
    }, []);


    const toast = useToast();
  

  
    async function handleSaveClicked() {
      if (!orgData.organization_name || !orgData.leader || !orgData.description) {
        toast({
          title: "Cannot Created.",
          description: "Please provide all information for new organization.",
          status: "error",
          duration: 1500,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }
  
      const { data, error } = await supabase
        .from("Organizations")
        .update(orgData)
        .eq("organization_id", orgData.organization_id)
        .select();
  
      if (!error) {
        // reset the default data
      }
      onClose();
    }
  
    return (
      <>
        <Button
                padding="0"
                pl="1"
                minWidth="25"
                minHeight="25" 
                variant="ghost"
                onClick={onOpen}>
          <PencilSquareIcon/>
        </Button>
  
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay bg={"blackAlpha.300"} backdropFilter={"blur(5px)"} />
          <ModalContent minWidth={"600px"}>
            <ModalHeader textAlign="center" fontSize={"25px"} marginTop={"20px"}>
              Edit Organization
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody marginBottom={"80px"}>
              <Stack spacing={"15px"}>
                <Text fontWeight={"medium"}>Organization Name</Text>
                <Input
                  size="md"
                  value={orgData.organization_name}
                  onChange={(e) =>
                    setOrgData({
                      ...orgData,
                      organization_name: e.target.value,
                    })
                  }
                  maxWidth={"480px"}
                />
                <Text fontWeight={"medium"}>Organization Lead</Text>
                <Input
                  size="md"
                  value={orgData.leader}
                  onChange={(e) =>
                    setOrgData({
                      ...orgData,
                      leader: e.target.value,
                    })
                  }
                  maxWidth={"480px"}
                />
                <Text fontWeight={"medium"}>Organization Description</Text>
                <Textarea
                  value={orgData.description}
                  onChange={(e) =>
                    setOrgData({
                      ...orgData,
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
                Save Organization
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  