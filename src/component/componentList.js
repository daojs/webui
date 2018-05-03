import React from 'react';
import _ from 'lodash';
import { Form, Icon, Menu } from 'antd';


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

      <Menu
        mode="inline"
        defaultExpandAll
        defaultSelectedKeys={['0']}
        onClick={({ key }) => props.onSelect(key)}
        onSelect={(e) => {
          console.log(e);
        }}
      >
        <Menu.SubMenu title="Layout" />
        <Menu.SubMenu title="Container" />
        <Menu.SubMenu title="Components" >
          <Menu.ItemGroup title="Charts">
            { items.filter(item => _.includes(item.category, 'chart')).map(item => (
              <Menu.Item key={item.name} >
                <Icon type="dot-chart" />{item.name}
              </Menu.Item>
            )) }
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Slicers" />
        </Menu.SubMenu>
      </Menu>
    </Form>
  );
}
