import React from 'react';
import _ from 'lodash';
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
        defaultSelectedKeys={['0']}
        onSelect={selectedKeys => props.onSelect(_.toInteger(selectedKeys[0]))}
      >
        { items.map((item, index) => (
          <TreeNode
            title={item}
            key={_.toString(index)}
            icon={<Icon type="dot-chart" />}
          />))
        }
      </Tree>
    </Form>
  );
}
