import NotePreview from "./NotePreview.client";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  return <NotePreview id={id} />;
}