import MainNavBar from "../../components/Navbar/MainNavBar";
import ProjectNavBar from "./components/ProjectNavBar";
import { Separator } from "../../components/ui/separator";

function ProjectPage() {
  return (
    <div className="project-page">
      <MainNavBar></MainNavBar>
      <div className="main">
        <Separator></Separator>
        <ProjectNavBar></ProjectNavBar>
      </div>
    </div>
  );
}

export default ProjectPage;
