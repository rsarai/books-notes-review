import * as React from 'react';

function SvgTag(props) {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g data-name="84-Tag">
        <path
          d="M25 26H1a1 1 0 01-1-1V7a1 1 0 011-1h24a1 1 0 01.83.45l6 9a1 1 0 010 1.11l-6 9A1 1 0 0125 26zM2 24h22.46l5.33-8-5.33-8H2z"
          data-name="&lt;Group&gt;"
        />
        <circle cx={24} cy={16} r={2} />
      </g>
    </svg>
  );
}

export default SvgTag;
