import React, { useState } from 'react';
import { useQueryClient } from 'react-query';

import DeleteHighlightPanel from 'components/DeleteHighlightPanel';
import { HighlightCard } from 'components/Highlights';
import { useRandomHighlight } from 'hooks/useHighlight';

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

  if (status === 'loading') {
    return null;
  }

  if (status === error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ maxWidth: '1156px', margin: 'auto' }}>
      <ReviewContainer highlight={data} />
      <div
        style={{
          textAlign: 'right',
          color: '#5e8ccd',
          paddingRight: '30px',
          margin: '30px',
          cursor: 'pointer',
        }}
        onClick={() => {
          refetch();
        }}
      >
        Next
      </div>
    </div>
  );
}

export default ReviewRandomCards;
