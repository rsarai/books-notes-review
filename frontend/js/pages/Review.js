import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { get } from 'lodash';

import {
  Form,
  Input,
  Button,
  Text,
  DeleteButton,
  DeletePanel,
  HighlightButtons,
} from '../components/card/style';
import SvgEdit from '../constants/Icons/Edit';
import SvgFavorite from '../constants/Icons/Tag';
import SvgTag from '../constants/Icons/Favorite';
import SvgDelete from '../constants/Icons/Delete';

function EditHighlightForm({ highlightId, setHighlightId }) {
  const { status, data, error } = useQuery('hightlight-detail', () =>
    fetch(`/api/highlights/${highlightId}/`).then((res) => res.json())
  );
  const hightlight = get(data, 'results');
  console.log(error);
  return (
    <div>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <a onClick={() => setHighlightId(-1)} href="#">
              Back
            </a>
          </div>
          {!highlightId || status === 'loading' ? (
            'Loading...'
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <h1>{hightlight.book.name}</h1>
              <div>
                <p>{hightlight.content}</p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function Content(props) {
  const highlight = props.highlight;
  return (
    <>
      <div className="header-card">{highlight.book.name}</div>
      {highlight.content}
    </>
  );
}

function Highlights({ setHighlightId }) {
  const { status, data, error } = useQuery('hightlights', () =>
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
          {data.results.map((hightlight) => (
            <div className="highlight-card">
              <Content highlight={hightlight} />
              <HighlightButtons>
                <SvgEdit width="18px" height="18px" onClick={() => setHighlightId(hightlight.id)} />
                <SvgFavorite width="18px" height="18px" />
                <SvgTag width="18px" height="18px" />
                <SvgDelete width="18px" height="18px" />
              </HighlightButtons>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

function ReviewCards() {
  const [highlightId, setHighlightId] = useState(-1);
  return (
    <>
      {highlightId > -1 ? (
        <EditHighlightForm highlightId={highlightId} setHighlightId={setHighlightId} />
      ) : (
        <Highlights setHighlightId={setHighlightId} />
      )}
    </>
  );
}

export default ReviewCards;
