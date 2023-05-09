import * as i from 'types';
import { useQuery } from '@tanstack/react-query';

export const fetchUser = (id: string): Promise<i.Data> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: 'John Doe',
      });
    }, 50);
  });
};

export const useGetUser = (userId?: string) => {
  // Use userId! to tell TS that we know it's defined, because of the enabled flag
  return useQuery<i.Data>(['user', userId], () => fetchUser(userId!), {
    enabled: Boolean(userId),
  });
};
