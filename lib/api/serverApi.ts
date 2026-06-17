import type { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { NotesResponse } from "./clientApi";

const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<NotesResponse> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();

  const response = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
};

export const checkSession = async (): Promise<
  AxiosResponse<User | null>
> => {
 const cookieHeader = await getCookieHeader();

const response = await api.get<User | null>(
  "/auth/session",
  {
    headers: {
      Cookie: cookieHeader,
    },
  }
);

return response;
};