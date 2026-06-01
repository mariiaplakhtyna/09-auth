interface NoteDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({ params }: NoteDetailsProps) {
  const { id } = await params;

  return (
    <div>
      <h1>Note details</h1>
      <p>ID: {id}</p>
    </div>
  );
}