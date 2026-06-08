"use client";

import { useRouter } from "next/navigation";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

type NotePreviewProps = {
  id: string;
};

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  return (
    <div>
      <button type="button" onClick={() => router.back()}>
        Close
      </button>
      <NoteDetailsClient id={id} />
    </div>
  );
}