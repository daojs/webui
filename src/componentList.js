import React from 'react';
import { Form, Tree, Icon } from 'antd';

const { TreeNode } = Tree;

export default function (props) {
  const { items = [], total = items.length, showResults } = props;

  return (
    <Form
      layout="vertical"
      style={{
        marginTop: '20px',
      }}
    >
      { showResults &&
        <p>{total} component result(s)</p>
      }

      <Tree
        showIcon
        defaultExpandAll
      >
        { items.map(item => (
          <TreeNode
            title={item}
            key={item}
            icon={<Icon type="right" />}
          />))
        }
      </Tree>
    </Form>
  );
}
