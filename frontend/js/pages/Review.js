import React, { useState } from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';

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
  const { status, data, error, refetch } = useRandomHighlight();
  const { mutateAsync: quickUpdateHighlight } = useUpdateContentMutation();

  if (status === 'loading') {
    return null;
  }

  if (status === error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      <ReviewContainer highlight={data} />
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
        <div onClick={() => refetch()}>Keep</div>
      </Footer>
    </div>
  );
}

export default ReviewRandomCards;
