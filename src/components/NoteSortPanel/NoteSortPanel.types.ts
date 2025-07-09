export type SortField = "title" | "createdAt" | "updatedAt" | "none";
export type SortDirection = "asc" | "desc";

export interface NoteSort {
  field: SortField;
  direction: SortDirection;
}

export interface NoteSortPanelProps {
  onCancel: () => void;
  onApply: (noteSort: NoteSort) => void;
}
