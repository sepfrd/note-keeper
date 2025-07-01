import type { NoteDto } from "@/types/note.types";

export interface ConfirmDeleteModalProps {
  isOpen: boolean;
  note: NoteDto | null;
  onCancel: () => void;
  onConfirmAsync: (deletedNote: NoteDto) => Promise<void>;
}
