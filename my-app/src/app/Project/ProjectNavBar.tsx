import Link from "next/link";

export default function ProjectNavBar() {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link href="/Project" className="font-semibold text-primary">
        General
      </Link>
      <Link href="/Project/folder">Folder</Link>
      <Link href="/Project/schedule">Schedule</Link>
      <Link href="/Project/task">Task</Link>
      <Link href="/Project/setting">Setting</Link>
    </nav>
  );
}
