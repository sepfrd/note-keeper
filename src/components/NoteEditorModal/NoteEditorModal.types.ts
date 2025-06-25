import type { NoteDto, UpdatedNoteDto } from "@/types/note.types";

export interface NoteEditorModalProps {
  note: NoteDto;
  onClose: () => void;
  onSaveAsync: (updatedNote: NoteDto) => Promise<void>;
}
