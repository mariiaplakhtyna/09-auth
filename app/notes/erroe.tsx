"use client";

export default function NotesError({ error }: { error: Error }) {
  return <p>Could not fetch notes. {error.message}</p>;
}