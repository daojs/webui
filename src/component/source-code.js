import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/styles/hljs';

export default function SourceCode(props) {
  return (
    <div style={{ border: '1px solid #eee', borderTop: '0', lineHeight: '18px' }}>
      <SyntaxHighlighter
        language="javascript"
        style={vs}
        codeTagProps={{
        style: {
          display: 'block',
          width: '100%',
          wordBreak: 'break-all',
          wordWrap: 'break-word',
          whiteSpace: 'pre-wrap',
        },
      }}
      >
        {props.source}
      </SyntaxHighlighter>
    </div>
  );
}
