import React, { useState } from 'react';
import axios from '../../utils/axios';

import { useToggle } from 'react-use';
import * as yup from 'yup';
import { useMutation, useQueryClient, useQuery } from 'react-query';

import EditHighlightForm from 'components/EditHighlight/EditHighlightForm';
import { Button, Text, DeleteButton, DeletePanel, HighlightButtons } from './style';
import SvgEdit from '../../constants/Icons/Edit';
import SvgFavorite from '../../constants/Icons/Tag';
import SvgTag from '../../constants/Icons/Favorite';
import SvgDelete from '../../constants/Icons/Delete';
import { omit } from 'lodash';

let contentSchema = yup.object().shape({
  content: yup.string().required(),
});

function Content(props) {
  const highlight = props.highlight;
  return (
    <>
      <div className="header-card">{highlight.book.name}</div>
      {highlight.content}
    </>
  );
}

function Card(props) {
  const highlight = props.highlight;
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useToggle(false);
  const [isDeleting, setIsDeleting] = useToggle(false);

  const deleteContentMutation = useMutation(
    (values) => axios.delete(`/api/highlights/${values.id}/`),
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(['highlights']);
        setIsDeleting(false);
      },
    }
  );

  return (
    <div className="highlight-card">
      {isEditing ? (
        <>
          <EditHighlightForm highlight={highlight} setIsEditing={setIsEditing} />
        </>
      ) : (
        <>
          <Content highlight={highlight} />
          <HighlightButtons>
            <SvgEdit width="18px" height="18px" onClick={() => setIsEditing(true)} />
            <SvgFavorite width="18px" height="18px" />
            <SvgTag width="18px" height="18px" />
            <SvgDelete
              width="18px"
              height="18px"
              onClick={() => {
                setIsDeleting(true);
              }}
            />
          </HighlightButtons>
        </>
      )}
      {isDeleting ? (
        <DeletePanel>
          <Text color="black">Delete highlight?</Text>
          <DeleteButton
            key="delete-highlight"
            onClick={(e) => {
              e.preventDefault();
              deleteContentMutation.mutate(highlight);
            }}
          >
            Yes
          </DeleteButton>
          <Button key="dont-delete-highlight" onClick={() => setIsDeleting(false)}>
            No
          </Button>
        </DeletePanel>
      ) : null}
    </div>
  );
}

export default Card;
