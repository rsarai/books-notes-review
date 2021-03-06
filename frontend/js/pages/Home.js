import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from 'react-bootstrap/Spinner';
import { get } from 'lodash';

import Card from '../components/card';

const Home = () => {
  const [reload, setReload] = useState(false);
  const { isLoading, isError, data, error } = useQuery('highlights', () =>
    fetch('/api/highlights/?limit=5').then((res) => res.json())
  );

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spinner animation="border" size="md" role="status" aria-hidden="true" />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container">
      {get(data, 'results').map((highlight) => (
        <span key={`key-${highlight.id}`}>
          <Card highlight={highlight} callBack={setReload} />
        </span>
      ))}
    </div>
  );
};

export default Home;
