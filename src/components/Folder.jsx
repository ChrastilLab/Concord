import { useState } from "react";
import { Switch, FormControl, Flex, Text, Button } from "@chakra-ui/react";

function Folder({ folderId }) {
  const [isListView, setIsListView] = useState(false);

  const handleToggle = () => {
    setIsListView(!isListView);
  };

  const driveUrl = `https://drive.google.com/drive/folders/${folderId}`;
  const embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#${
    isListView ? "list" : "grid"
  }`;

  return (
    <div>
      <Flex align="center" mb={4}>
        <FormControl display="flex" alignItems="center">
          <Text mr={2}>Grid View</Text>
          <Switch
            id="view-switch"
            isChecked={isListView}
            onChange={handleToggle}
          />
          <Text ml={2} mr={4}>
            List View
          </Text>
          <Button
            as="a"
            colorScheme="blue"
            variant="outline"
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Drive Folder
          </Button>
        </FormControl>
      </Flex>

      <iframe
        src={embedUrl}
        title="Google Drive View"
        width="100%"
        height="500"
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default Folder;