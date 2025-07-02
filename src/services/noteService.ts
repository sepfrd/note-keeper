import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import apiClient from "@/services/apiClient";
import type { ApiResponse } from "@/types/api.types";
import type { NoteDto, NoteFilterDto, UpdatedNoteDto } from "@/types/note.types";
import { safeRequest } from "@/utils/safeRequest";

export const noteService = {
  createAsync: (noteDto: NoteDto) => safeRequest<ApiResponse<NoteDto>>(() => apiClient.post(API_ENDPOINTS.NOTES, noteDto)),
  getAllAsync: (noteFilterDto?: NoteFilterDto) => safeRequest<ApiResponse<NoteDto[]>>(() => apiClient.get(API_ENDPOINTS.NOTES, { params: noteFilterDto })),
  updateAsync: (updatedNote: UpdatedNoteDto) => safeRequest<ApiResponse<NoteDto | void>>(() => apiClient.patch(`${API_ENDPOINTS.NOTES_UUID}/${updatedNote.uuid}`, updatedNote)),
  deleteAsync: (noteUuid: string) => safeRequest<ApiResponse<void>>(() => apiClient.delete(`${API_ENDPOINTS.NOTES_UUID}/${noteUuid}`)),
};
