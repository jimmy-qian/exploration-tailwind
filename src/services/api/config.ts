import getApiUrl from './getApiUrl';
import { ApiConfig } from './types';

const apiConfig: ApiConfig = {
  /**
   * API base url
   * @see generateOptions.js
   */
  apiUrls: {
    default: getApiUrl(),
  },

  /**
   * Default API to choose if no option is given
   * @see generateOptions.js
   */
  defaultApi: 'default',

  /**
   * Login path of the app
   * Used to redirect for unauthorized calls
   * @see redirectToLogin.js
   */
  loginPath: '/login',

  /**
   * Not found page of the app
   * Used to redirect if the client does not have access rights to the content
   */
  notFoundPath: '/404',

  /**
   * If the app isn't depended on authorization put this to false
   * @see generateOptions.js
   */
  defaultWithAuth: false,

  /**
   * Trigger general error message for api failures
   * @param message - generated error message
   */
  errorMessageFunction: (message): void => {
    console.error('API failed', message);
  },
};

export default apiConfig;
