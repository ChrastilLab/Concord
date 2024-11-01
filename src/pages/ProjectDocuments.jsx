import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import IndividualProjectHeader from "../components/IndividualProjectHeader";
import IndividualProjectSidenav from "../components/IndividualProjectSidenav";
import Folder from '../components/Folder';
import { Box, Flex, Text } from '@chakra-ui/react';

function ProjectDocuments() {
  const { organization, project_name } = useParams();
  const [folderId, setFolderId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = useSupabaseClient();
  const session = useSession();

  useEffect(() => {
    const fetchDriveLink = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("Projects")
          .select("drive_link, Organizations(organization_name)")
          .eq("Organizations.organization_name", organization)
          .eq("project_name", project_name)
          .single();

        if (error) throw error;
        if (data.drive_link === null) throw new Error("Drive link not found for this project, please make sure the project has a valid drive link");
        const id = data.drive_link.split('/')[5].split('?')[0];
        setFolderId(id);
      } catch (error) {
        console.error("Error fetching drive link:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriveLink();
  }, [organization, project_name, supabase]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Flex flexDirection={"column"} height={"100vh"}>
      <IndividualProjectHeader />
      {session ? (
        <Box flex={1} display={"flex"} flexDirection={"row"} zIndex={1}>
          <IndividualProjectSidenav
            organization={organization}
            project_name={project_name}
          />
          <Flex
            pl={"3.5%"}
            pt={"3%"}
            pr={"3.5%"}
            flex={1}
            flexDirection={"column"}
          >
            <Text
              fontSize={"180%"}
              fontFamily={"Inter"}
              fontWeight={600}
              mb={"4%"}
            >
              {project_name} Documents
            </Text>

            {folderId && (
              <Box flex={1}>
                <Folder folderId={folderId} />
              </Box>
            )}
          </Flex>
        </Box>
      ) : (
        <div>Not logged in</div>
      )}
    </Flex>
  );
}

export default ProjectDocuments;
