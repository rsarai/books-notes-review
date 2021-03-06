import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get, map } from 'lodash';
import Spinner from 'react-bootstrap/Spinner';

import { Content } from 'pages/Review';
import { useBookDetail } from 'hooks/useBooks';

export function BookDetail() {
  const { id } = useParams();
  const { data: books, isLoading } = useBookDetail({ id });

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        <Spinner animation="border" size="md" role="status" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      <div style={{ textAlign: 'right', paddingTop: '30px', paddingRight: '30px', margin: '30px' }}>
        <Link to="/highlights/books">Back</Link>
      </div>
      {map(get(books, 'highlights'), (highlight) => (
        <div key={`highlight-${highlight.id}`} className="highlight-card">
          <Content highlight={highlight} />
        </div>
      ))}
    </div>
  );
}
