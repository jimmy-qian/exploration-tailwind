import handleStatusCodes from './handleStatusCodes';
import triggerErrorMessage from './triggerErrorMessage';
import { RequestOptions, ApiError } from './types';

const request = ({ path, options, isFile, isJson, errorConfig = {} }: RequestOptions) =>
  new Promise(async (resolve, reject) => {
    fetch(path, options)
      .then(async (response) => {
        if (await handleStatusCodes(response.status)) return;

        if (response.ok) {
          if (isFile) return response.blob();
          if (isJson) return response.json();
          return response.text();
        }

        return Promise.reject(response);
      })
      .then((json) => {
        resolve(json);
      })
      .catch((json) => {
        try {
          json
            .then((err: ApiError) => {
              triggerErrorMessage(errorConfig, err);
              reject(err);
            })
            .catch();
        } catch (err) {
          triggerErrorMessage(errorConfig, json);
          reject(json);
        }
      });
  });

export default request;
