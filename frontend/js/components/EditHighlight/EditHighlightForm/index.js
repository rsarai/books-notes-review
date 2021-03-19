import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Formik } from 'formik';
import { get, map, omit } from 'lodash';

import { useMutationEditHighlight } from 'hooks/useHighlight';
import { Form, Input, Button, Text, SidePanel, FieldsContainer } from './style';

let contentSchema = yup.object().shape({
  content: yup.string().required(),
});

const EditHighlightForm = ({ highlight }) => {
  const { mutateAsync: updateContentMutation } = useMutationEditHighlight();

  return (
    <Formik
      initialValues={{
        ...omit(highlight, ['book', 'notes']),
        notes: '',
      }}
      enableReinitialize
      validationSchema={contentSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await updateContentMutation({ payload: values });
          resetForm({ notes: '' });
        } catch (error) {
          const errorData = get(error, 'response.data');
          if (errorData) {
            actions.setErrors(errorData);
            map(errorData, (error) => {
              toast(error, { type: toast.TYPE.ERROR });
            });
          } else {
            toast('Something went wrong!', { type: toast.TYPE.ERROR });
          }
        }
      }}
    >
      {({ values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FieldsContainer>
            <SidePanel>
              <label>Edit Content</label>
              <Input
                name="content"
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                className="text-input"
                len={values.content.length < 200 ? 150 : values.content.length}
              />
              {errors.content && touched.content && <Text color="red">{errors.content}</Text>}
            </SidePanel>
            <SidePanel>
              <label>Current notes</label>
              <div className="notes">
                <ul>
                  {map(highlight.notes, (note) => {
                    return <li>{note.content}</li>;
                  })}
                </ul>
              </div>
              <Input
                name="notes"
                className="text-input"
                placeholder="Create notes..."
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ borderRadius: '10px' }}
              />
              {errors.notes && touched.notes
                ? map(get(errors, 'notes'), (error) => {
                    return <Text color="red">{get(error, 'non_field_errors')}</Text>;
                  })
                : null}
              {errors.notes && touched.notes
                ? map(get(get(errors, 'notes')[0], 'content'), (error) => {
                    return <Text color="red">{error}</Text>;
                  })
                : null}
            </SidePanel>
          </FieldsContainer>
          <div style={{ display: 'flex' }}>
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
