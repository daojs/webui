import React from 'react';
import _ from 'lodash';
import { Form, Icon, Menu } from 'antd';

function renderCategoryFactory(comps) {
  return (Component, props) => (
    <Component title={props.title} key={props.key}>
      { comps.filter(item => _.includes(item.category, props.key)).map(item => (
        <Menu.Item key={item.name} >
          <Icon type="dot-chart" />{item.name}
        </Menu.Item>
      )) }
    </Component>
  );
}

export default class ComponentList extends React.Component {
  onClick = ({ key }) => {
    // key is component name
    this.props.onSelect(key);
  }

  render() {
    const {
      comps = [],
      total = comps.length,
      selectedCompName,
      showResults,
    } = this.props;
    const renderCategory = renderCategoryFactory(comps);

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
          defaultOpenKeys={['layout', 'container', 'component']}
          selectedKeys={[selectedCompName]}
          onClick={this.onClick}
        >

          { renderCategory(Menu.SubMenu, { title: 'Layout', key: 'layout' }) }
          { renderCategory(Menu.SubMenu, { title: 'Container', key: 'container' }) }
          <Menu.SubMenu title="Components" key="component" >
            { renderCategory(Menu.ItemGroup, { title: 'Charts', key: 'chart' }) }
            { renderCategory(Menu.ItemGroup, { title: 'Slicers', key: 'slicer' }) }
            { renderCategory(Menu.ItemGroup, { title: 'Utilities', key: 'utility' }) }
          </Menu.SubMenu>
        </Menu>
      </Form>
    );
  }
}
