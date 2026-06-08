import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  return <NoteDetailsClient id={id} />;
}