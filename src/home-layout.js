import React from 'react';
import {
  Layout,
  Breadcrumb,
  Icon,
  Button,
} from 'antd';
import _ from 'lodash';

const {
  Header, Content, Footer, Sider,
} = Layout;

const styles = {
  button: {
    cursor: 'default',
    color: '#aaa',
    borderColor: '#aaa',
  },
};

export default class HomeLayout extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    const {
      LeftComp, RightComp,
    } = this.props;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width={280}
          style={{ background: '#f0f2f5', borderRight: '1px solid #ddd' }}
        >
          <div
            style={{ padding: '10px' }}
          >
            <div
              className="appicon"
              style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}
            >
              <Button ghost style={_.defaults({ flex: 1, marginRight: '10px', fontWeight: 'bold' }, styles.button)}>
                Dao Registry
              </Button>
              <Button ghost style={_.defaults({ padding: '0 10px' }, styles.button)}>
                <Icon type="appstore-o" />
              </Button>
            </div>
            {LeftComp}
          </div>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {RightComp}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
