import React, { useState } from 'react';
import axios from '../../utils/axios';

import { useToggle } from 'react-use';
import * as yup from 'yup';
import { Formik } from 'formik';

import { useMutation, useQueryClient, useQuery } from 'react-query';

import { Form, Input, Button, Text, DeleteButton, DeletePanel, HighlightButtons } from './style';
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

  const updateContentMutation = useMutation(
    (values) => axios.put(`/api/highlights/${values.id}/`, omit(values, ['books'])),
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(['hightlights']);
        setIsEditing(false);
      },
    }
  );

  const deleteContentMutation = useMutation(
    (values) => axios.delete(`/api/highlights/${values.id}/`),
    {
      onSuccess: async () => {
        await queryClient.refetchQueries(['hightlights']);
        setIsDeleting(false);
      },
    }
  );

  return (
    <div className="highlight-card">
      {isEditing ? (
        <>
          <Formik initialValues={highlight} validationSchema={contentSchema}>
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateContentMutation.mutate(values);
                }}
              >
                <Input
                  type="content"
                  name="content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  len={values.content.length < 200 ? 50 : Math.floor(values.content.length / 4)}
                />
                {errors.content && touched.content && <Text color="red">{errors.content}</Text>}
                {updateContentMutation.isError ? <Text color="red">An error occurred</Text> : null}
                <div style={{ display: 'flex' }}>
                  <Button onClick={() => setIsEditing(false)}>Back</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
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
          <Text color="black">Delete hightlight?</Text>
          <DeleteButton
            key="delete-hightlight"
            onClick={(e) => {
              e.preventDefault();
              deleteContentMutation.mutate(highlight);
            }}
          >
            Yes
          </DeleteButton>
          <Button key="dont-delete-hightlight" onClick={() => setIsDeleting(false)}>
            No
          </Button>
        </DeletePanel>
      ) : null}
    </div>
  );
}

export default Card;
