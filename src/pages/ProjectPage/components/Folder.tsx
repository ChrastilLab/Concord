import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, buttonVariants} from "../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";


interface File {
  id: string;
  name: string;
}

function Folder() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [files, setFiles] = useState<File[]>([]);


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

  console.log("logging session in Folder.tsx")
  console.log(session);

  return (
    <div>
        <Tabs defaultValue="grid">
            <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <Button variant="ghost">
                <a href="https://drive.google.com/drive/folders/1ffv1lf5sB6cO9V9l_yN-WjxWfmh5-jic" target="_blank" rel="noopener noreferrer">
                Go to Drive Folder
                </a>
            </Button>

            <TabsContent value="grid">
                <iframe src="https://drive.google.com/embeddedfolderview?id=1ffv1lf5sB6cO9V9l_yN-WjxWfmh5-jic#grid" title="Google Drive Grid View" width="100%" height="500" frameBorder="0"></iframe>
            </TabsContent> 
            <TabsContent value="list">
                <iframe src="https://drive.google.com/embeddedfolderview?id=1ffv1lf5sB6cO9V9l_yN-WjxWfmh5-jic#list" title="Google Drive List View" width="100%" height="500" frameBorder="0"></iframe>
            </TabsContent> 
        </Tabs>
    </div>
  );
}

export default Folder;

