export interface ApiResponse<T> {
  data: T;
  isSuccess: boolean;
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
  isSuccess: boolean;
}
