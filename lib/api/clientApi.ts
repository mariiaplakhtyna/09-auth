import { api } from "@/lib/api/api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  username: string;
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

export const register = async (data: AuthData): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);

  return response.data;
};

export const login = async (data: AuthData): Promise<User> => {
  const response = await api.post<User>("/auth/login", data);

  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const response = await api.get<User | null>("/auth/session");

  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");

  return response.data;
};

export const updateMe = async (
  data: UpdateUserData
): Promise<User> => {
  const response = await api.patch<User>("/users/me", data);

  return response.data;
};