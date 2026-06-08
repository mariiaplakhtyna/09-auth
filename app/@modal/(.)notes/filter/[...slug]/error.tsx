"use client";

export default function FilterNotesError({ error }: { error: Error }) {
  return <p>Could not fetch notes. {error.message}</p>;
}