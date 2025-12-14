export interface ErrorConfig {
  code: number;
  title: string;
  message: string;
}

export type ErrorType = 400 | 401 | 403 | 404 | 500 | 503;