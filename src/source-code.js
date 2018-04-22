import React from 'react';
import { Card, Form } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/styles/hljs';

export default function SourceCode(props) {
  return (
    <Form.Item>
      <Card
        type="inner"
        title="Source code"
      >
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
      </Card>
    </Form.Item>
  );
}
