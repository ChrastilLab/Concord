// React Imports
import { Link } from "react-router-dom";

// Frontend Imports
import { Button } from "../../../components/ui/button";

interface SideBarNavProps {
  hidden: boolean;
}

function SideBarNav({ hidden }: SideBarNavProps) {
  return (
    <nav className={`flex flex-col grow md:flex max-w-xs max-h-screen pr-4${hidden ? " hidden" : ""}`}>
      <Button variant="secondary" className="justify-start">
        <Link to="/" className="text-primary"> Studies </Link>
      </Button>
      <Button variant="ghost" className="justify-start">
        <Link to="/announcements"> Announcements </Link>
      </Button>
      <Button variant="ghost" className="justify-start">
        <Link to="/posts"> Posts </Link>
      </Button>
      <Button variant="ghost" className="justify-start">
        <Link to="/members"> Members </Link>
      </Button>
      <Button variant="ghost" className="mt-auto justify-start">
        <Link to="/settings"> Settings </Link>
      </Button>
      {/* TODO: Log-Out Functionality */}
      <Button variant="ghost" className="justify-start">
        <Link to="/"> Log Out </Link>
      </Button>
    </nav>
  );
}

export default SideBarNav;
