import apiClient from "@/services/apiClient";
import type { ApiResponse } from "@/types/api.types";
import type { NoteDto, NoteFilterDto, UpdatedNoteDto } from "@/types/note.types";

export const noteService = {
  createAsync: async (noteDto: NoteDto): Promise<ApiResponse<NoteDto> | unknown> => {
    try {
      const response = await apiClient.post<ApiResponse<NoteDto>>("/notes", noteDto);
      return response.data;
    } catch (error: unknown) {
      return error;
    }
  },
  getAllAsync: async (noteFilterDto: NoteFilterDto): Promise<ApiResponse<NoteDto[]> | unknown> => {
    try {
      const response = await apiClient.get<ApiResponse<NoteDto>>("/notes", { params: noteFilterDto });
      return response.data;
    } catch (error: unknown) {
      return error;
    }
  },
  updateAsync: async (updatedNote: UpdatedNoteDto): Promise<ApiResponse<NoteDto> | null> => {
    try {
      const response = await apiClient.patch<ApiResponse<NoteDto>>(`/notes/uuid/${updatedNote.uuid}`, updatedNote);

      if (typeof response === "object") {
        const apiResponse = response.data as ApiResponse<NoteDto>;
        return apiResponse;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  },
};
