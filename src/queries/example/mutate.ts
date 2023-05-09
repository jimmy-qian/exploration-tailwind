import * as i from 'types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const postUser = (data: i.DataPayload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1',
        ...data,
      });
    }, 1000);
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation((data: i.Data) => postUser(data), {
    onSuccess: (_, data) => {
      queryClient.invalidateQueries(['user', data.id]);
      queryClient.setQueryData(['user', data.id], data);
    },
  });
};
