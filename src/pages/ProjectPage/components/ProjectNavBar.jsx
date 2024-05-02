import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import "../../PageNavBar.css";

function ProjectNavBar() {
  let navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <nav className="individual-page-navbar">
      <Button
        className="individual-page-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project")}
      >
        Home
      </Button>
      <Button
        className="individual-page-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project/folder")}
      >
        Folder
      </Button>
      <Button
        className="individual-page-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project/schedule")}
      >
        Schedule
      </Button>
      <Button
        className="individual-page-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project/task")}
      >
        Task
      </Button>
      <Button
        className="individual-page-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/project/setting")}
      >
        Setting
      </Button>
    </nav>
  );
}

export default ProjectNavBar;
