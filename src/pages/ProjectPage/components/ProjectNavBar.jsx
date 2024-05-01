import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import "./ProjectNavBar.css";

function ProjectNavBar() {
  let navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <nav className="project-navbar">
      <Button
        className="project-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project")}
      >
        Home
      </Button>
      <Button
        className="project-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project/folder")}
      >
        Folder
      </Button>
      <Button
        className="project-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project/schedule")}
      >
        Schedule
      </Button>
      <Button
        className="project-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project/task")}
      >
        Task
      </Button>
      <Button
        className="project-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project/setting")}
      >
        Setting
      </Button>
    </nav>
  );
}

export default ProjectNavBar;
