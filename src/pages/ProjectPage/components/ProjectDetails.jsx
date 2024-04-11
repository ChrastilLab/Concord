import { Box, Text } from "@chakra-ui/react";
import FramedBox from "../../../components/FramedBox/FramedBox";

function ProjectDetails(props) {
  const navigateDetails = props.navigateDetails;

  return (
    <FramedBox title1="Project Details" onClick={navigateDetails}>
      <Box h="100%" w="100%" bg="#eeeeee">
        <Text></Text>
      </Box>
    </FramedBox>
  );
}

export default ProjectDetails;
