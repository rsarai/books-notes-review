import React, { useState } from 'react';
import { get, map } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { DateTime } from 'luxon';

import { Content } from 'pages/Review';
import { useBooks, useBookDetail } from 'hooks/useBooks';

export function BookDetail() {
  const { id } = useParams();
  const { data: books, isLoading } = useBookDetail({ id });

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      {map(get(books, 'highlights'), (highlight) => (
        <div key={`highlight-${highlight.id}`} className="highlight-card">
          <Content highlight={highlight} />
        </div>
      ))}
    </div>
  );
}

export function BookList() {
  const { data: books, isLoading } = useBooks();

  if (isLoading) {
    return 'Loading...';
  }
  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      <Row>
        <Col>Title</Col>
        <Col>Author</Col>
        <Col>Highlights</Col>
        <Col>Created At</Col>
      </Row>
      {map(books, (book) => (
        <Row key={book.id}>
          <Col>
            <Link to={`/highlights/books/${book.id}`}>{book.name}</Link>
          </Col>
          <Col>{book.author}</Col>
          <Col>{book.highlights_count}</Col>
          <Col>{DateTime.fromISO(book.created).toFormat('dd/LL/yyyy')}</Col>
        </Row>
      ))}
    </div>
  );
}

export default BookList;
