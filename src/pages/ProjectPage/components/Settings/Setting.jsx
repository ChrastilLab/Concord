import MainNavBar from "../../../../components/Navbar/MainNavBar";
import ProjectNavBar from "../ProjectNavBar/ProjectNavBar";
import { Separator } from "../../../../components/ui/separator";

function Setting() {
  return (
    <div className="project-page">
      <MainNavBar></MainNavBar>
      <div className="main">
        <ProjectNavBar></ProjectNavBar>
        <Separator></Separator>
      </div>
    </div>
  );
}

export default Setting;
