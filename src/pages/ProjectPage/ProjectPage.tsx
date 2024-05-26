import MainNavBar from "../../components/MainNavBar/MainNavBar";
// import ProjectNavBar from "./components/ProjectNavBar";
import Tasks from "./components/Tasks";
import Folder from "./components/Folder";
import Schedule from "./components/Schedule";
import Settings from "./components/Settings";


import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProjectPage() {
  

  let { projectId } = useParams();

  console.log("Project ID: ", projectId);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNavBar />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Project</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <Tabs defaultValue="tasks" className="w-[1000px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="folder">Folder</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks">
              <Tasks projectId={projectId} />
            </TabsContent>
            <TabsContent value="folder">
              <Folder />
            </TabsContent>
            <TabsContent value="schedule">
              <Schedule/>
            </TabsContent>

            <TabsContent value="settings">
              <Settings/>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default ProjectPage;
