import config from './config';
import { GenerateOptions } from './types';

const generateOptions: GenerateOptions = ({
  method,
  path,
  baseUrl,
  isFile = false,
  isJson = true,
  isUpload = false,
  error,
  type = config.defaultApi,
  withAuth = config.defaultWithAuth,
  ...options
}) => {
  const apiUrl = baseUrl || config.apiUrls[type];
  const headers = options.headers || {};
  const query = options.query as Record<string, string>;
  const queries = query ? `?${new URLSearchParams(query)}` : '';
  const isNotFileUpload = !isFile || !isUpload;
  let body = method !== 'GET' ? ((options.body || {}) as BodyInit) : undefined;

  if (isNotFileUpload) {
    headers['Content-Type'] = 'application/json';

    if (body) {
      body = JSON.stringify(body);
    }
  }

  return {
    path: `${apiUrl}${path}${queries}`,
    options: {
      method,
      headers,
      body,
    },
    isFile,
    isJson,
    errorConfig: error,
    withAuth,
  };
};

export default generateOptions;
