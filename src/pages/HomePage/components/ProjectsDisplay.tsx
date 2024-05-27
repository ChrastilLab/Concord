// React Imports
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Backend Imports
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Project from "../../../types/Project";

// Frontend Imports
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent} from "../../../components/ui/dropdown-menu";
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";

function ProjectsDisplay() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = useSupabaseClient();
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("Projects").select("*");

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log(data);
        setProjects(data as Project[]);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
      // TODO: Refactor New Study into separate component, resolve nested button issue
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 ">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle> Your Projects </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Here is where all of your projects are listed. You can create one
              by clicking on button below.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button >
                  Create New Study
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <CardHeader>
                  <CardTitle> Create New Study </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="w-[350px]">
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="studyname"> Study Name </Label>
                        <Input id="studyname" placeholder="Study Name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label id="studydescription"> Study Description </Label>
                        <Textarea id="studydescription" placeholder="Study Description"></Textarea>
                        <div className="flex flex-col space-y-1.5"></div>
                        <Label htmlFor="studymembers"> Study Members </Label>
                        <Select>
                          <SelectTrigger id="studymembers">
                            <SelectValue placeholder="Select Members" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="member"> Member </SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex flex-col space-y-1.5"></div>
                        <Label htmlFor="studygoogledrivelink"> Study Google Drive Link </Label>
                        <Input id="studygoogledrivelink" placeholder="Google Drive Link" />
                      </div>
                    </div>
                  </form>                 
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    Cancel
                  </Button>
                  <Button>
                    Confirm 
                  </Button>
                </CardFooter>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
        {projects.map((project) => (
          <Card key={project.id} x-chunk={`dashboard-05-chunk-${project.id}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-4xl">
                <Link
                  to={`/project/${project.id}`}
                  className="transition-colors hover:text-foreground"
                >
                  {project.project_name}
                </Link>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Led by {project.project_lead}
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ProjectsDisplay;
