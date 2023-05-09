import { Middleware } from './types';

export const middlewareExample: Middleware = (next) => (options) => {
  // Do things

  // Execute the next middleware
  // Don't forget to pass the options
  next(options);
};
