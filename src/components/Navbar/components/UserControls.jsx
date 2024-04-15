// Components don't need to be this complicated but this is just an example of separation of concerns
import React, { useState, useEffect } from "react";
import { Avatar, Flex, Button, Center, useToast } from "@chakra-ui/react";
import { auth } from "../../../config/firebase";

function UserControls() {
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log("Navbar user", currentUser);
    });

    return () => unsubscribe();
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

  return (
    <div>
      <Flex p={5}>
        <Center>
          <Avatar />
          {user && (
            <Button onClick={handleLogout} size="md" ml={5}>
              Logout
            </Button>
          )}
        </Center>
      </Flex>
    </div>
  );
}

export default UserControls;
