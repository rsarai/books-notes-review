import React, { useState } from 'react';
import { map } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { useBooks } from 'hooks/useBooks';

const BookRow = styled(Row)`
  margin-bottom: 15px;
  border: 1px solid #d8dbdf;
  padding: 15px;
  background-color: white;
`;

export function BookList() {
  const { data: books, isLoading } = useBooks();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        <Spinner animation="border" size="md" role="status" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      <br></br>
      <br></br>
      <br></br>
      <h1>Library</h1>
      <img src="/staticfiles/check.png" alt="" />
      <br></br>
      <BookRow>
        <Col>Title</Col>
        <Col sm={3}>Author</Col>
        <Col sm={1} style={{ textAlign: 'center' }}>
          Highlights
        </Col>
        <Col sm={2} style={{ textAlign: 'center' }}>
          Created At
        </Col>
      </BookRow>
      {map(books, (book) => (
        <BookRow key={book.id}>
          <Col>
            <Link to={`/highlights/books/${book.id}`}>{book.name}</Link>
          </Col>
          <Col sm={3}>{book.author}</Col>
          <Col sm={1} style={{ textAlign: 'center' }}>
            {book.highlights_count}
          </Col>
          <Col sm={2} style={{ textAlign: 'center' }}>
            {DateTime.fromISO(book.created).toFormat('dd/LL/yyyy')}
          </Col>
        </BookRow>
      ))}
    </div>
  );
}

export default BookList;
