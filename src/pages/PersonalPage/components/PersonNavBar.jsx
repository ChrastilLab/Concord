import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import "../../PageNavBar.css";

function PersonNavBar() {
  let navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <nav className="individual-page-navbar">
      <Button
        className="individual-page-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/person")}
      >
        Profile
      </Button>
      <Button
        className="individual-page-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/person/task-checklist")}
      >
        Task Checklist
      </Button>
      <Button
        className="individual-page-nav-button"
        variant="ghost"
        onClick={() => handleNavigate("/person/task-calendar-view")}
      >
        Task Calendar
      </Button>
    </nav>
  );
}

export default PersonNavBar;
