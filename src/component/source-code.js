import React from 'react';

// Standard build
// import SyntaxHighlighter from 'react-syntax-highlighter/prism';
// import { vs } from 'react-syntax-highlighter/styles/prism';

// Light build, 0.5M smaller bundle size
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import vs from 'react-syntax-highlighter/styles/prism/vs';

registerLanguage('jsx', jsx);

export default function SourceCode(props) {
  return (
    <div style={{ border: '1px solid #eee', borderTop: '0', lineHeight: '18px' }}>
      <SyntaxHighlighter
        language="jsx"
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
