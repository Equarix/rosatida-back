export interface ResponseApi<T> {
  message: string;
  body: T;
  status: number;
  token?: string;
  errors?: string[];
}

interface Metadata {
  totalItems: number;
  itemCount: number;
  totalPages: number;
  currentPage: number;
}

export interface ResponseExtras<T> {
  data: T;
  token?: string;
  metadata?: Metadata;
}
