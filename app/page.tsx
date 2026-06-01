import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>NoteHub</h1>
      <p>A note management application.</p>
      <Link href="/notes">Open notes</Link>
    </main>
  );
}