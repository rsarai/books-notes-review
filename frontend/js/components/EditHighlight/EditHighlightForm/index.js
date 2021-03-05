import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { Formik } from 'formik';
import { omit } from 'lodash';

import axios from '../../../utils/axios';
import { Form, Input, Button, Text } from './style';

let contentSchema = yup.object().shape({
  content: yup.string().required(),
});

const EditHighlightForm = ({ highlight, setIsEditing }) => {
  const queryClient = useQueryClient();

  const updateContentMutation = useMutation(
    (values) => axios.put(`/api/highlights/${values.id}/`, omit(values, ['books'])),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('highlights');
        setIsEditing(false);
      },
    }
  );
  return (
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
  );
};

export default EditHighlightForm;
