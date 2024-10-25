import React, { useState, useEffect } from "react";
import {
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function MemberSelect({ onChange }) {
  const supabase = useSupabaseClient();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("Users")
      .select("user_id, display_name")
      .order("display_name", { ascending: true });

    if (error) {
      console.error("Error fetching members:", error);
    } else {
      setMembers(data);
    }
  };

  const handleSelectMember = (userId, displayName) => {
    setSelectedMember({ user_id: userId, display_name: displayName });
    onChange(userId);
  };

  const filteredMembers = members.filter((member) =>
    member.display_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormControl mt={4}>
      <Menu>
        <MenuButton 
          fontWeight='normal' 
          border='2px' 
          borderColor="#A1A1AA" 
          bg='white' 
          as={Button} 
          rightIcon={<ChevronDownIcon />} 
          width="100%"
        >
          {selectedMember ? selectedMember.display_name : "Select Member"}
        </MenuButton>
        <MenuList border='2px' borderColor="#A1A1AA" maxHeight="230px" overflowY="auto" width='600px'>
          <Box padding={2}>
            <Input
              placeholder="Search Member"
              mb={2}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
          {filteredMembers.map((member) => (
            <MenuItem 
              key={member.user_id}
              onClick={() => handleSelectMember(member.user_id, member.display_name)}
            >
              <Text>{member.display_name}</Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  );
}

export default MemberSelect;