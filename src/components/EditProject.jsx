import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  SimpleGrid,
  Stack,
  Input,
  Textarea,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { supabase } from "../config/supabase";

const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user, error };
};

const checkIfAdmin = async (userId) => {
  const { data, error } = await supabase
    .from("Users")
    .select("user_type")
    .eq("user_id", userId);
  const isAdmin = !error && data.length > 0 && data[0].user_type;
  return isAdmin;
};

function EditProject({ project, onProjectUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState({});
  const [userAdmin, setUserAdmin] = useState(false);
  const [leaderData, setLeaderData] = useState([]);
  const { Organizations, ...filteredProject } = project; 
  const [editData, setEditData] = useState({ ...filteredProject });

  useEffect(() => {
    const fetchData = async () => {
        const { user, error } = await fetchUser();

        if (!error && user) {
            setUserData(user);

            const isAdmin = await checkIfAdmin(user.id);
            if (isAdmin) {
                setUserAdmin(true);
            }
        }
    };

    fetchData();
  }, []);

  const handleSaveClicked = async () => {
    const { error } = await supabase
      .from("Projects")
      .update(editData)
      .eq('project_id', editData.project_id);

    if (!error) {
      onProjectUpdate();
      onClose();
    } else {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
    <Button size="lg"
            fontSize="24px" 
            padding="0" 
            minWidth="40px"
            minHeight="40px" 
            variant="ghost">
     <EditIcon onClick={onOpen} />
    </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              fontFamily={"Inter"}
              fontSize={"26px"}
              fontStyle={"normal"}
              fontWeight={600}
              lineHeight={"28px"}
              textAlign={"center"}
              pt={"15px"}
            >
              Edit/Update Project
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pl={"40px"} pr={"40px"} pb={"20px"}>
            <SimpleGrid columns={2} spacing={"70px"}>
              <Stack spacing={"14px"}>
                <Text>Title</Text>
                <Input
                  placeholder="Give a title..."
                  value={editData.project_name}
                  onChange={(e) =>
                    setEditData({ ...editData, project_name: e.target.value })
                  }
                />
                <Text>Project Description</Text>
                <Textarea
                  placeholder="Write some descriptions..."
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                />
                {userAdmin && (
                  <>
                    <Text>IRB Number</Text>
                    <Input
                      placeholder="Provide an IRB number..."
                      value={editData.irb_number}
                      onChange={(e) =>
                        setEditData({ ...editData, irb_number: e.target.value })
                      }
                    />
                  </>
                )}
                <Text>Project Lead</Text>
                <Select
                  placeholder="Select Lead"
                  value={editData.project_lead}
                  onChange={(e) =>
                    setEditData({ ...editData, project_lead: e.target.value })
                  }
                >
                  {leaderData.map((item) => (
                    <option key={item.user_id} value={item.display_name}>
                      {item.display_name}
                    </option>
                  ))}
                </Select>
                <Text>Miscellaneous Notes</Text>
                <Textarea
                  placeholder="Add any notes..."
                  value={editData.notes}
                  onChange={(e) =>
                    setEditData({ ...editData, notes: e.target.value })
                  }
                />
              </Stack>
              <Stack>
                <Text>Hypothesis</Text>
                <Input
                  placeholder="Provide a hypothesis..."
                  value={editData.hypothesis}
                  onChange={(e) =>
                    setEditData({ ...editData, hypothesis: e.target.value })
                  }
                />
                <Spacer />
                <Text>How is it Tested?</Text>
                <Textarea
                  placeholder="Describe the test method..."
                  value={editData.testing}
                  onChange={(e) =>
                    setEditData({ ...editData, testing: e.target.value })
                  }
                />
                <Spacer />
                <Text>Status</Text>
                <Select
                  placeholder="Select Current Status"
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Select>
                <Spacer />
                <Text>Preferred RA Commitment</Text>
                <Textarea
                  placeholder="Describe the RA commitment..."
                  value={editData.commitment}
                  onChange={(e) =>
                    setEditData({ ...editData, commitment: e.target.value })
                  }
                />
                <Spacer />
                <Text>Goal</Text>
                <Input
                  placeholder="What is the goal of the project..."
                  value={editData.goal}
                  onChange={(e) =>
                    setEditData({ ...editData, goal: e.target.value })
                  }
                />
              </Stack>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleSaveClicked}
              mb={"5px"}
            >
              Update Project
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProject;