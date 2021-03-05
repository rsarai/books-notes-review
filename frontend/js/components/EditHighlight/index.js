import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { get } from 'lodash';
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
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {!highlightId || status === 'loading' ? (
            'Loading...'
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
