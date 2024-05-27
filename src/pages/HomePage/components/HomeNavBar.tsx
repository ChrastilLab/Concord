import { Link } from "react-router-dom";
function HomeNavBar() {
  return (
    <div>
      <nav
        className="grid gap-4 text-sm text-muted-foreground"
        x-chunk="dashboard-04-chunk-0"
      >
        <Link to="/" className="font-semibold text-primary">
          General
        </Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/members">Members</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
  );
}

export default HomeNavBar;
