import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const getTag = (slug: string[]) => {
  return slug[0] === "all" ? undefined : slug[0];
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTag(slug);

  const title = tag ? `${tag} notes | NoteHub` : "All notes | NoteHub";
  const description = tag
    ? `Browse notes filtered by ${tag}.`
    : "Browse all notes in NoteHub.";

  const url = tag
    ? `https://notehub.com/notes/filter/${tag}`
    : "https://notehub.com/notes/filter/all";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
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

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;
  const tag = getTag(slug);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}