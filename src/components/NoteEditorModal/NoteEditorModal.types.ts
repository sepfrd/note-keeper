import type { NoteDto } from "@/types/note.types";

export interface NoteEditorModalProps {
  note: NoteDto;
  onClose: () => void;
  onSaveAsync: (updatedNote: NoteDto) => Promise<void>;
}
