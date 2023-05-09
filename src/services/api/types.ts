/* eslint-disable @typescript-eslint/no-explicit-any */

export type ErrorConfig = {
  hide?: boolean;
  message?: string;
};

type ApiTypes = 'default';

export type RequestOptions = {
  path: string;
  options: RequestInit;
  isFile: boolean;
  isJson: boolean;
  errorConfig: ErrorConfig;
  withAuth: boolean;
};

export type Options = {
  method: string;
  baseUrl?: string;
  path: string;
  query?: Record<string, string | number> | URLSearchParams | undefined;
  body?: any;
  type?: ApiTypes;
  withAuth?: boolean;
  isFile?: boolean;
  isJson?: boolean;
  isUpload?: boolean;
  error?: any;
  headers?: HeadersInit;
};

export type GenerateOptions = (options: Options) => RequestOptions;

export type FetchCall = <T = any>(args: Omit<Options, 'method'>) => Promise<T>;

export type ApiError = {
  reason: string;
};

export type Middleware = (next: NextMiddleware) => (options: RequestOptions, ...args: any) => void;
export type NextMiddleware = (options: RequestOptions, ...args: any) => void;

export type ApiConfig = {
  apiUrls: {
    [type in ApiTypes]: string;
  };
  loginPath: string;
  notFoundPath: string;
  defaultWithAuth: boolean;
  defaultApi: ApiTypes;
  errorMessageFunction: (message: string) => void;
};

export type HandleStatusCodes = (code: number) => Promise<boolean>;

export type AnyPromise = Promise<any>;
