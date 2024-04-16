// Components don't need to be this complicated but this is just an example of separation of concerns
import React, { useState, useEffect } from "react";
import { Avatar, Flex, Button, Center, useToast } from "@chakra-ui/react";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

function UserControls() {
  const [user, setUser] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    function handleAuthChange(currentUser) {
      setUser(currentUser);
      console.log("Navbar user", currentUser);
    }

    const unsubscribe = auth.onAuthStateChanged(handleAuthChange);

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    try {
      auth.signOut();
      toast({
        title: "Logged out",
        description: "debug use only",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleLogin = () => {
    navigate(`/login`);
  };

  return (
    <div>
      <Flex p={5}>
        <Center>
          <Avatar />
          <Button onClick={user ? handleLogout : handleLogin} size="md" ml={5}>
            {user ? "Logout" : "Login"}
          </Button>
        </Center>
      </Flex>
    </div>
  );
}

export default UserControls;
