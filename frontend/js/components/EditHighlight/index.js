import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import axios from '../../utils/axios';

import EditHighlightForm from './EditHighlightForm';

function EditHighlight({ highlightId, setHighlightId }) {
  const { status, data, error } = useQuery('highlight-detail', () =>
    axios.get(`/api/highlights/${highlightId}/`).then((res) => res)
  );
  const highlight = get(data, 'data');

  return (
    <div>
      {status === 'loading' ? (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" size="md" role="status" aria-hidden="true" />
        </div>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {!highlightId || status === 'loading' ? (
            <div style={{ textAlign: 'center' }}>
              <Spinner animation="border" size="md" role="status" aria-hidden="true" />
            </div>
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <h1>{highlight.book.name}</h1>
              <EditHighlightForm highlight={highlight} setIsEditing={setHighlightId} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default EditHighlight;
