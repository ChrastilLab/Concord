import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Switch, FormControl, FormLabel, Box, Flex, Text, Button, ButtonGroup } from "@chakra-ui/react";

//No individual project page yet, will include folder inside project page in the future
function Folder() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [files, setFiles] = useState([]);
  const [isListView, setIsListView] = useState(false);

  
  //Useful when developing own frontend
  {/*}
  function getDriveFiles() {
    if (session) {
      const folderId = '1ffv1lf5sB6cO9V9l_yN-WjxWfmh5-jic'; //dummy data
      fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${session.provider_token}`, //use the access token from the session
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          if (data && data.files) {
            setFiles(data.files);
          } else {
            setFiles([]);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          setFiles([]);
        });
    }
  }

  useEffect(() => {
    getDriveFiles(); // fetch the files when the component mounts
  }, [session]); // re-run the effect when the session changes
  */}
  const handleToggle = () => {
    setIsListView(!isListView);
  };


  return (
    <div>
      <Flex align="center" mb={4}>
        <FormControl display="flex" alignItems="center">
          <Text mr={2}>Grid View</Text>
          <Switch id="view-switch" isChecked={isListView} onChange={handleToggle} />
          <Text ml={2} mr={4}>List View</Text>
          <Button colorScheme='blue' variant="outline">
            <a href="https://drive.google.com/drive/folders/1ffv1lf5sB6cO9V9l_yN-WjxWfmh5-jic" target="_blank" rel="noopener noreferrer">
              Go to Drive Folder
            </a>
          </Button>
        </FormControl>
      </Flex>

      <iframe
        src={`https://drive.google.com/embeddedfolderview?id=1ffv1lf5sB6cO9V9l_yN-WjxWfmh5-jic#${isListView ? "list" : "grid"}`}
        title="Google Drive View"
        width="100%"
        height="500"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default Folder;