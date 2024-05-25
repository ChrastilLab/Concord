import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Project from "../../../types/Project";

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
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 ">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Your Projects</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Here is where all of your projects are listed. You can create one
              by clicking on button below.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create New Project</Button>
          </CardFooter>
        </Card>
        {projects.map((project) => (
          <Card key={project.id} x-chunk={`dashboard-05-chunk-${project.id}`}>
            <CardHeader className="pb-2">
              <CardDescription>{project.description}</CardDescription>
              <CardTitle className="text-4xl">
                <Link
                  to={`/project/${project.id}`}
                  className="transition-colors hover:text-foreground"
                >
                  {project.project_name}
                </Link>
              </CardTitle>
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
