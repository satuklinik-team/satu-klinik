export interface BaseFindConnectionResponse<T = unknown> {
  data: T[];
  count: number;
}

export interface BaseErrorResponse {
  error: string;
  message?: string;
  statusCode: number;
}
