import React from 'react';
import _ from 'lodash';
import { Form, Icon, Menu } from 'antd';

function renderCategoryFactory(items) {
  return (Component, props) => (
    <Component title={props.title} key={props.key}>
      { items.filter(item => _.includes(item.category, props.key)).map(item => (
        <Menu.Item key={item.name} >
          <Icon type="dot-chart" />{item.name}
        </Menu.Item>
      )) }
    </Component>
  );
}

export default function (props) {
  const { items = [], total = items.length, showResults } = props;
  const renderCategory = renderCategoryFactory(items);

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

      <Menu
        mode="inline"
        defaultExpandAll
        defaultSelectedKeys={['0']}
        // key is component name
        onClick={({ key }) => props.onSelect(key)}
      >
        <Menu.SubMenu title="Layout" />
        { renderCategory(Menu.SubMenu, { title: 'Container', key: 'container' }) }
        <Menu.SubMenu title="Components" >
          { renderCategory(Menu.ItemGroup, { title: 'Charts', key: 'chart' }) }
          { renderCategory(Menu.ItemGroup, { title: 'Slicers', key: 'slicer' }) }
          { renderCategory(Menu.ItemGroup, { title: 'Utilities', key: 'utility' }) }
        </Menu.SubMenu>
      </Menu>
    </Form>
  );
}
