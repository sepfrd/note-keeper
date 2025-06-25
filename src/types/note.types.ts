export interface NoteDto {
  userUuid?: string;
  uuid: string;
  title: string;
  content: string;
}

export interface UpdatedNoteDto {
  uuid: string;
  newTitle: string;
  newContent: string;
}

export interface FilterDtoBase {
  createdAtStartDate?: Date;
  createdAtEndDate?: Date;
  updatedAtStartDate?: Date;
  updatedAtEndDate?: Date;
}

export interface NoteFilterDto extends FilterDtoBase {
  pageNumber?: number;
  pageSize?: number;
  title?: string;
  content?: string;
  userUuid?: string;
}
