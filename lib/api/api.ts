import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<NotesResponse> => {
  const response = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (
  note: CreateNoteData
): Promise<Note> => {
  const response = await api.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};