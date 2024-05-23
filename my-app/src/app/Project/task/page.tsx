import MainNavBar from "@/app/MainNavBar";
import ProjectNavBar from "../ProjectNavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AssignedTask from "./assignedTask";
import { Tags } from "lucide-react";

export default function ProjectPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNavBar></MainNavBar>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Project</h1>
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <ProjectNavBar />
          <div className="flex space-x-6">
            <Input
              type="filter"
              placeholder="Filter Tasks..."
              className="pl-3 sm:w-[300px] md:w-[200px] lg:w-[550px]"
            />
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Tags></Tags>
                <span>Tags</span>
              </Button>
            </div>
            <AssignedTask />
          </div>
        </div>
      </main>
    </div>
  );
}
