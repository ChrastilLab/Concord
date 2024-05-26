// React Imports
import { Link } from "react-router-dom";

// Frontend Imports
import { Button } from "../../../components/ui/button";

function SideBarNav() {
  return (
    <nav className="flex grow flex-col px-4">
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
      <Button variant="ghost" className="justify-start">
        <Link to="/"> Log Out </Link>
      </Button>
    </nav>
  );
}

export default SideBarNav;
