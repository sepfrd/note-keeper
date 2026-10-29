export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  statusCode: number;
}

export interface PaginatedApiResponse<T> {
  pageNumber: number;
  pageSize: number;
  currentPageCount: number;
  totalCount: number;
  data: T[];
  message: T;
  statusCode: number;
  success: boolean;
}
