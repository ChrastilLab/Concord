import "./MainNavBar.css";
import { Button, buttonVariants } from "../../components/ui/button";
import { LogInIcon, NetworkIcon } from "lucide-react";
import { DashboardIcon, PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

function MainNavBar() {
  let navigate = useNavigate();

  function handleNavigate(path) {
    navigate(path);
  }

  return (
    <>
      <div className="main-nav-bar">
        <h1>Logo</h1>
        <div className="button-container">
          <Button
            className="nav-button"
            variant="outline"
            onClick={() => handleNavigate("/")}
          >
            <DashboardIcon />
            &nbsp;
            <p>Home</p>
          </Button>

          <Button
            className="nav-button"
            variant="outline"
            onClick={() => handleNavigate("/project")}
          >
            <NetworkIcon />
            &nbsp;
            <p>Project</p>
          </Button>

          <Button
            className="nav-button"
            variant="outline"
            onClick={() => handleNavigate("/person")}
          >
            <PersonIcon />
            &nbsp;
            <p>Person</p>
          </Button>

          <div className="login-button-container">
            <Button
              className="nav-button"
              variant="outline"
              onClick={() => handleNavigate("/login")}
            >
              <LogInIcon />
              &nbsp; &nbsp;
              <p>Login</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainNavBar;
