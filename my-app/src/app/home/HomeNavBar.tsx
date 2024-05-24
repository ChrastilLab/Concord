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
<<<<<<< HEAD
      <Link href="/home/announcements">Announcements</Link>
      <Link href="/home/posts">Posts</Link>
      <Link href="/home/members">Members</Link>
      <Link href="/home/settings">Settings</Link>
=======
      <Link href="/Home/announcements">Announcements</Link>
      <Link href="/Home/projects">Projects</Link>
      <Link href="/Home/posts">Posts</Link>
      <Link href="/Home/members">Members</Link>
      <Link href="/Home/settings">Settings</Link>
>>>>>>> 89c546b (Create basic profile page and avatar change)
    </nav>
  );
}
