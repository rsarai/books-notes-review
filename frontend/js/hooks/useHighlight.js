import React from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { get, omit } from 'lodash';
import axios from '../utils/axios';

export function useRandomHighlight(params = {}) {
  return useQuery(
    ['highlights-random', params],
    async () => {
      const { data } = await axios.get('/api/highlights/random/');
      return data[0];
    },
    { refetchOnWindowFocus: false, refetchOnMount: false }
  );
}

export function useHighlight(params = {}) {
  return useQuery(['highlights-detail', params], async () => {
    const { data } = await axios.get(`/api/highlights/${params.id}/`);
    return data;
  });
}

export function useUpdateContentMutation(params = {}) {
  return useMutation(
    async (values) => await axios.put(`/api/highlights/${values.id}/`, omit(values, ['books']))
  );
}

export const useMutationEditHighlight = createMutationHook(
  ['highlights-detail'],
  async ({ payload }) => {
    const notes = get(payload, 'notes');
    const { data } = await axios.patch(`/api/highlights/${payload.id}/`, {
      notes: [{ content: notes }],
      ...omit(payload, ['books', 'notes']),
    });
    return data;
  }
);

function createMutationHook(queryKey, queryFn) {
  return () => {
    const queryClient = useQueryClient();

    return useMutation(
      queryFn,
      // OPTIMISTIC UPDATE CONFIG:
      {
        // When mutate is called:
        onMutate: (patch) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          // queryClient.cancelQueries(queryKey);

          // Snapshot the previous value
          const existingData = queryClient.getQueryData(queryKey);

          // Optimistically update to the new value
          // queryClient.setQueryData(queryKey, { ...existingData, ...patch });

          queryClient.invalidateQueries(queryKey);
          // Return a rollback function
          return () => queryClient.setQueryData(queryKey, existingData);
        },
        // If the mutation fails, use the rollback function we returned above
        onError: (err, newTodo, rollback) => rollback(),
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.refetchQueries(queryKey);
        },
      }
    );
  };
}
