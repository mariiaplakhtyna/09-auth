import type { Metadata } from "next";
import { fetchNoteById } from "@/lib/api/api";
import Modal from "@/components/Modal/Modal";
import NotePreview from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = `${note.title} | NoteHub`;
  const description = note.content.slice(0, 100);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  return (
    <Modal onClose={() => {}}>
  <NotePreview id={id} />
</Modal>
  );
}