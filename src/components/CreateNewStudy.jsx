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
    Flex,
} from '@chakra-ui/react';
import { supabase } from "../config/supabase";
import { useState, useEffect } from 'react';




function CreateNewStudy({ projects }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const[userData, setUserData] = useState({});
    const[userAdmin, setUserAdmin] = useState(false);

    const [LeaderData, setLeaderData] = useState([]);
    const [newData, setNewData] = useState({
        project_id: -1,
        project_name: '',
        description: '',
        organization_id: 0,
        irb_number: '',
        project_lead: '',
        notes: '',
        hypothesis: '',
        testing: '',
        status: '',
        commitment: '',
        goal: '',
    });


    async function assignNecessary() {
      const { data, error } = await supabase
          .from("Projects")
          .select("project_id");
  
      if (!error) {
          const newProjectID = data.length + 1;
          
          return { ...newData, project_id: newProjectID , organization_id: projects[0].organization_id};
      }
  
      return {...newData, organization_id: projects[0].organization_id};
    }
  
    async function handleSaveClicked() {
      const updatedData = await assignNecessary();
  
      const { error } = await supabase.from("Projects").insert(updatedData);
  
      if (!error) {
          setNewData({
              project_id: -1,
              project_name: '',
              description: '',
              organization_id: 0,
              irb_number: '',
              project_lead: '',
              notes: '',
              hypothesis: '',
              testing: '',
              status: '',
              commitment: '',
              goal: '',
          });
      }
      onClose();
    }

    async function openModal() {
      const {data, error} = await supabase.from("Users").select("user_type").eq("user_id", userData.user.id);
            
      if(!error && data.length > 0){
          setUserAdmin(data[0].user_type);
      }

      onOpen();
    }
  


    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from("Users")
                .select("user_id, display_name");

            if (!error) {
                setLeaderData(data);
            }
        };

        const fetchUser = async () => {
            const {data, error} = await supabase.auth.getUser();

            if (!error){
                setUserData(data);
            }
        };


        fetchUser();
        fetchData();
    }, []);

    return (
      <>
        <Button 
        onClick={openModal} fontSize='14' 
        w='26vh'  bg='black' color='white'>Create New Study</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Text 
              fontFamily={'Inter'} fontSize={'26px'} fontStyle={'normal'} 
              fontWeight={600} lineHeight={'28px'} textAlign={'center'} pt={'15px'}>New Project</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pl={'40px'} pr={'40px'} pb={'20px'}>
                <SimpleGrid columns={2} spacing={'70px'}>
                    <Stack spacing={'14px'}>
                        <Text>Title</Text>
                        <Input placeholder='Give a title...' value={newData.project_name} onChange={(e) => setNewData({...newData, project_name: e.target.value})}></Input>
                        <Text>Project Description</Text>
                        <Textarea placeholder='Write some descriptions...' value={newData.description} onChange={(e) => setNewData({...newData, description: e.target.value})}></Textarea>

                        {userAdmin && (
                        <>
                        <Text>IRB Number</Text>
                        <Input placeholder='Provide an IRB number...' value={newData.irb_number} onChange={(e) => setNewData({...newData, irb_number: e.target.value})}></Input> 
                        </>)}
                        <Text>Project Lead</Text>
                        <Select placeholder='Select Lead' value={newData.project_lead} onChange={(e) => setNewData({...newData, project_lead: e.target.value})}>
                            {LeaderData.map((item) => {
                                return <option key={item.user_id} value={item.display_name}>{item.display_name}</option>
                            })}
                        </Select>
                        <Text>Miscellaneous Notes</Text>
                        <Textarea placeholder='Add any notes...' value={newData.notes} onChange={(e) => setNewData({...newData, notes: e.target.value})}></Textarea>
                    </Stack>
                    <Stack>
                        <Text>Hypothesis</Text>
                        <Input placeholder='Provide a hypothesis...' value={newData.hypothesis} onChange={(e) => setNewData({...newData, hypothesis: e.target.value})}></Input>
                        <Spacer/>
                        <Text>How is it Tested?</Text>
                        <Textarea placeholder='Describe the test method...' value={newData.testing} onChange={(e) => setNewData({...newData, testing: e.target.value})}></Textarea>
                        <Spacer/>
                        <Text>Status</Text>
                        <Select placeholder='Select Current Status' value={newData.status} onChange={(e) => setNewData({...newData, status: e.target.value})}>
                            <option value='Not Started'>Not Started</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Completed'>Completed</option>
                        </Select>
                        <Spacer/>
                        <Text>Prefered RA Committment</Text>
                        <Textarea placeholder='Describe the RA commitment...' value={newData.commitment} onChange={(e) => setNewData({...newData, commitment: e.target.value})}></Textarea>
                        <Spacer/>
                        <Text>Goal</Text>
                        <Input placeholder='What is the goal of the project...' value={newData.goal} onChange={(e) => setNewData({...newData, goal: e.target.value})}></Input>
                    </Stack>
                </SimpleGrid>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='green' mr={3} onClick={handleSaveClicked} mb={'5px'}>Create Project</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default CreateNewStudy;