import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import axios from 'utils/axios';

import { Content } from 'components/Highlights';
import { HighlightButtons } from 'components/card/style';
import SvgEdit from 'constants/Icons/Edit';
import SvgTag from 'constants/Icons/Tag';
import SvgDelete from 'constants/Icons/Delete';
import SvgFullFavorite from 'constants/Icons/FullFavorite';

export function Favorite({ highlight }) {
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
        <Link to={`/highlights/review/${highlight.id}`}>
          <SvgEdit width="18px" height="18px" />
        </Link>
        <Favorite highlight={highlight} />
        <SvgTag width="18px" height="18px" />
        <SvgDelete width="18px" height="18px" onClick={() => setDeleteHighlightId(highlight.id)} />
      </HighlightButtons>
    </div>
  );
}
