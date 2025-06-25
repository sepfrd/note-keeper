import type { NoteDto } from "@/types/note.types";

export interface NoteCardProps {
  note: NoteDto;
  onClick: () => void;
}
