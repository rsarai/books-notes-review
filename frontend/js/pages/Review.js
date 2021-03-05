import React, { useState } from 'react';
import { omit } from 'lodash';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import DeleteHighlightPanel from 'components/DeleteHighlightPanel';
import EditHighlight from 'components/EditHighlight';
import { HighlightButtons } from '../components/card/style';
import SvgEdit from '../constants/Icons/Edit';
import SvgTag from '../constants/Icons/Tag';
import SvgFullFavorite from '../constants/Icons/FullFavorite';
import SvgDelete from '../constants/Icons/Delete';
import axios from '../utils/axios';

export function Content(props) {
  const highlight = props.highlight;
  return (
    <>
      <div className="header-card">{highlight.book.name}</div>
      {highlight.content}
    </>
  );
}

function Favorite({ highlight }) {
  const favoriteMutation = useMutation((values) => {
    values.favorite = !values.favorite;
    axios.put(`/api/highlights/${values.id}/`, omit(values, ['books']));
  });
  return (
    <SvgFullFavorite
      width="18px"
      height="18px"
      fill={highlight.favorite ? 'red' : 'none'}
      stroke={highlight.favorite ? 'red' : 'black'}
      onClick={() => {
        favoriteMutation.mutate(highlight);
      }}
    />
  );
}

export function HighlightCard({ highlight, setHighlightId, setDeleteHighlightId }) {
  return (
    <div key={`highlight-${highlight.id}`} className="highlight-card">
      <Content highlight={highlight} />
      <HighlightButtons>
        <SvgEdit width="18px" height="18px" onClick={() => setHighlightId(highlight.id)} />
        <Favorite highlight={highlight} />
        <SvgTag width="18px" height="18px" />
        <SvgDelete width="18px" height="18px" onClick={() => setDeleteHighlightId(highlight.id)} />
      </HighlightButtons>
    </div>
  );
}

function Highlights({ setHighlightId, setDeleteHighlightId }) {
  const { status, data, error } = useQuery('highlights', () =>
    fetch('/api/highlights/?limit=5').then((res) => res.json())
  );

  return (
    <div>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data.results.map((highlight) => (
            <HighlightCard
              highlight={highlight}
              setHighlightId={setHighlightId}
              setDeleteHighlightId={setDeleteHighlightId}
            />
          ))}
        </>
      )}
    </div>
  );
}

function ReviewCards() {
  const [highlightId, setHighlightId] = useState(-1);
  const [deleteHighlightId, setDeleteHighlightId] = useState(-1);

  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      {highlightId && highlightId > -1 ? (
        <EditHighlight highlightId={highlightId} setHighlightId={setHighlightId} />
      ) : deleteHighlightId > -1 ? (
        <DeleteHighlightPanel
          deleteHighlightId={deleteHighlightId}
          setDeleteHighlightId={setDeleteHighlightId}
        />
      ) : (
        <Highlights setHighlightId={setHighlightId} setDeleteHighlightId={setDeleteHighlightId} />
      )}
    </div>
  );
}

export default ReviewCards;
