import React, { useState } from 'react';
import axios from '../../utils/axios';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Text, DeleteButton, DeletePanel } from './style';

function DeleteHighlightPanel({ deleteHighlightId, setDeleteHighlightId }) {
  const queryClient = useQueryClient();

  const deleteContentMutation = useMutation(
    (deleteHighlightId) => axios.delete(`/api/highlights/${deleteHighlightId}/`),
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(['highlights']);
        setDeleteHighlightId(-1);
      },
    }
  );

  return (
    <DeletePanel>
      <Text color="black">Delete highlight?</Text>
      <DeleteButton
        key="delete-highlight"
        onClick={(e) => {
          e.preventDefault();
          deleteContentMutation.mutate(deleteHighlightId);
        }}
      >
        Yes
      </DeleteButton>
      <Button key="dont-delete-highlight" onClick={() => setDeleteHighlightId(-1)}>
        No
      </Button>
    </DeletePanel>
  );
}

export default DeleteHighlightPanel;
