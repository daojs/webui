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

export default class ComponentList extends React.Component {
  // Hack for antd: defaultSelectedKeys for Menu does not work correctly
  static getDerivedStateFromProps(nextProps, prevState) {
    if (_.isArray(nextProps.items) &&
      !_.isEmpty(nextProps.items) &&
      _.isNull(prevState.selectedKey)) {
      return {
        selectedKey: nextProps.items[0].name,
      };
    }
    return null;
  }

  state = {
    selectedKey: null,
  }

  onClick = ({ key }) => {
    // key is component name
    this.setState({ selectedKey: key });
    this.props.onSelect(key);
  }

  render() {
    const { items = [], total = items.length, showResults } = this.props;
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
          defaultOpenKeys={['layout', 'container', 'component']}
          selectedKeys={[this.state.selectedKey]}
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
