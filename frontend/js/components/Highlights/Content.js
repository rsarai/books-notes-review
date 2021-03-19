import React, { useState } from 'react';

export function Content(props) {
  const highlight = props.highlight;
  return (
    <>
      <div className="header-card">{highlight.book.name}</div>
      {highlight.content}
    </>
  );
}
