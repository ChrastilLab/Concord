import "./HomeNavBar.css"; // Importing the CSS file
import { Button, buttonVariants } from "../../components/ui/button";

function HomeNavBar() {
  return (
    <>
      <div className="login-button">
        <Button asChild className="nav-button">
          <a href="/login">Login</a>
        </Button>
      </div>

      <div className="home-nav-bar">
        <h1>Logo</h1>
        <div className="button-container">
          <Button asChild className="nav-button">
            <a href="/">Home</a>
          </Button>
          <Button asChild className="nav-button">
            <a href="/">Project</a>
          </Button>
          <Button asChild className="nav-button">
            <a href="/">Person</a>
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomeNavBar;
