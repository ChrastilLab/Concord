import { Link } from "react-router-dom";

function ProjectNavBar() {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link to="/project" className="font-semibold text-primary">
        General
      </Link>
      <Link to="/project/folder">Folder</Link>
      <Link to="/project/schedule">Schedule</Link>
      <Link to="/project/task">Task</Link>
      <Link to="/project/setting">Setting</Link>
    </nav>
  );
}

export default ProjectNavBar;
