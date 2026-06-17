"use client";

export default function FilterError({ error }: { error: Error }) {
  return <p>Could not fetch notes. {error.message}</p>;
}
