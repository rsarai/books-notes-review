import React from 'react';
import { useMutation } from 'react-query';

export function createMutation(queryKey, queryFn) {
  return () => {
    const queryClient = useQueryClient();

    return useMutation(
      queryFn,
      // OPTIMISTIC UPDATE CONFIG:
      {
        // When mutate is called:
        onMutate: (patch) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          queryClient.cancelQueries(queryKey);

          // Snapshot the previous value
          const existingData = queryClient.getQueryData(queryKey);

          // Optimistically update to the new value
          queryClient.setQueryData(queryKey, { ...existingData, ...patch });

          // Return a rollback function
          return () => queryClient.setQueryData(queryKey, existingData);
        },
        // If the mutation fails, use the rollback function we returned above
        onError: (err, newTodo, rollback) => rollback(),
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries(queryKey);
        },
      }
    );
  };
}
