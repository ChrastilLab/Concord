import Link from "next/link";

export default function HomeNavBar() {
  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link href="/" className="font-semibold text-primary">
        General
      </Link>
      <Link href="/home/announcements">Announcements</Link>
      <Link href="/home/projects">Projects</Link>
      <Link href="/home/posts">Posts</Link>
      <Link href="/home/members">Members</Link>
      <Link href="/home/settings">Settings</Link>
    </nav>
  );
}
