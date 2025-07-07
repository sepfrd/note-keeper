export interface NoteFilterPanelProps {
  title?: string;
  content?: string;
  createdAtStartDate?: string;
  createdAtEndDate?: string;
  updatedAtStartDate?: string;
  updatedAtEndDate?: string;
}

export type NoteFilterField = keyof NoteFilterPanelProps;

export const noteFilterFieldMeta: Record<NoteFilterField, { label: string; type: "text" | "number" | "date" }> = {
  title: { label: "Title", type: "text" },
  content: { label: "Content", type: "text" },
  createdAtStartDate: { label: "Created At (From)", type: "date" },
  createdAtEndDate: { label: "Created At (To)", type: "date" },
  updatedAtStartDate: { label: "Updated At (From)", type: "date" },
  updatedAtEndDate: { label: "Updated At (To)", type: "date" },
};
