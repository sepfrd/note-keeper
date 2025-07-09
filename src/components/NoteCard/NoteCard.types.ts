import type { NoteDto } from "@/types/note.types";

export interface NoteCardProps {
  note: NoteDto;
  onClick: () => void;
  onDelete: () => void;
}

export const dateOptions: { locales: Intl.LocalesArgument; options: Intl.DateTimeFormatOptions } = {
  locales: navigator.language,
  options: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h24",
    hour12: false,
    timeZoneName: "shortGeneric",
  },
};
