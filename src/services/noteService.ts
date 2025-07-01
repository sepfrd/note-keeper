import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import apiClient from "@/services/apiClient";
import type { NoteDto, NoteFilterDto, UpdatedNoteDto } from "@/types/note.types";
import { safeRequest } from "@/utils/safeRequest";

export const noteService = {
  createAsync: (noteDto: NoteDto) => safeRequest<NoteDto>(() => apiClient.post(API_ENDPOINTS.NOTES, noteDto)),
  getAllAsync: (noteFilterDto?: NoteFilterDto) => safeRequest<NoteDto[]>(() => apiClient.get(API_ENDPOINTS.NOTES, { params: noteFilterDto })),
  updateAsync: (updatedNote: UpdatedNoteDto) => safeRequest<NoteDto>(() => apiClient.patch(`${API_ENDPOINTS.NOTES_UUID}/${updatedNote.uuid}`, updatedNote)),
  deleteAsync: (noteUuid: string) => safeRequest<void>(() => apiClient.delete(`${API_ENDPOINTS.NOTES_UUID}/${noteUuid}`)),
};
