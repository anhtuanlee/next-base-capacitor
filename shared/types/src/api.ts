export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

export type ListResponse<T> = {
  items: T[];
  total?: number;
};
