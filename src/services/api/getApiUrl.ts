declare const __PROD__: boolean;
declare const __ACC__: boolean;
declare const __TEST__: boolean;
declare const __DEV__: boolean;

const getApiUrl = () => {
  const defaultUrl = '';

  if (__PROD__) {
    return defaultUrl;
  }

  if (__ACC__) {
    return '';
  }

  if (__TEST__ || __DEV__) {
    return '';
  }

  return defaultUrl;
};

export default getApiUrl;
