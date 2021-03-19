import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get } from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import axios from '../../utils/axios';

import { useHighlight } from 'hooks/useHighlight';

import EditHighlightForm from './EditHighlightForm';

function EditHighlight({ highlightId, setHighlightId }) {
  const { status, data: highlight, error } = useHighlight(
    { id: highlightId },
    {
      // Refetch the data every second
      refetchInterval: 1000,
    }
  );

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

export function ReviewEditHighlight() {
  const { id } = useParams();
  const { status, data: highlight, error } = useHighlight({ id });

  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      <Link to="/highlights/review">Back</Link>
      {status === 'loading' ? (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" size="md" role="status" aria-hidden="true" />
        </div>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{highlight.book.name}</h1>
          <EditHighlightForm highlight={highlight} />
        </>
      )}
    </div>
  );
}

export default EditHighlight;
