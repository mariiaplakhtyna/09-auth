"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

type NotePreviewProps = {
  id?: string;
};

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const noteId = id ?? params.id;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: Boolean(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error) return <p>Error loading note.</p>;

  if (!note) return <p>Note not found.</p>;

  return (
    <Modal onClose={() => router.back()}>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p>{note.tag}</p>
      <p>{note.createdAt}</p>

      <button type="button" onClick={() => router.back()}>
        Close
      </button>
    </Modal>
  );
}