import React, { useState } from 'react';
import { omit } from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import { useToggle } from 'react-use';
import styled from 'styled-components';

import DeleteHighlightPanel from 'components/DeleteHighlightPanel';
import { HighlightCard } from 'components/Highlights';
import { useRandomHighlight, useUpdateContentMutation } from 'hooks/useHighlight';

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  color: #5e8ccd;
  padding-right: 30px;
  cursor: pointer;
  width: 500px;
`;

function ReviewContainer({ highlight }) {
  const [highlightId, setHighlightId] = useState(-1);
  const [deleteHighlightId, setDeleteHighlightId] = useState(-1);

  return (
    <>
      {deleteHighlightId > -1 ? (
        <DeleteHighlightPanel
          deleteHighlightId={deleteHighlightId}
          setDeleteHighlightId={setDeleteHighlightId}
        />
      ) : (
        <div>
          <HighlightCard
            highlight={highlight}
            setHighlightId={setHighlightId}
            setDeleteHighlightId={setDeleteHighlightId}
          />
        </div>
      )}
    </>
  );
}

function ReviewRandomCards() {
  const [isGettingNext, setIsGettingNext] = useToggle(false);
  const { status, data, error, refetch } = useRandomHighlight();
  const { mutateAsync: quickUpdateHighlight } = useUpdateContentMutation();
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  if (status === 'loading') {
    return null;
  }

  if (status === error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      {isGettingNext ? (
        <div style={{ textAlign: 'center', height: '200px' }}>
          <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
        </div>
      ) : (
        <ReviewContainer highlight={data} />
      )}

      <Footer>
        <div
          onClick={async () => {
            await quickUpdateHighlight({ ...omit(data, ['books']), should_be_reviewed: false });
          }}
        >
          Discard
        </div>
        <div
          onClick={async () => {
            await quickUpdateHighlight({ ...omit(data, ['books']), frequency: 'never' });
          }}
        >
          never
        </div>
        <div
          onClick={async () => {
            await quickUpdateHighlight({ ...omit(data, ['books']), frequency: 'soon' });
          }}
        >
          soon
        </div>
        <div
          onClick={async () => {
            await quickUpdateHighlight({ ...omit(data, ['books']), frequency: 'later' });
          }}
        >
          later
        </div>
        <div
          onClick={async () => {
            await quickUpdateHighlight({ ...omit(data, ['books']), frequency: 'someday' });
          }}
        >
          someday
        </div>
        <div
          onClick={async () => {
            await quickUpdateHighlight({ ...omit(data, ['books']), frequency: 'surprise' });
          }}
        >
          surprise
        </div>

        {isGettingNext ? (
          <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
        ) : (
          <div
            onClick={async () => {
              setIsGettingNext();
              await refetch();
              await delay(500);
              setIsGettingNext();
            }}
          >
            Keep
          </div>
        )}
      </Footer>
    </div>
  );
}

export default ReviewRandomCards;
