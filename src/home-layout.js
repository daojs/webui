import React from 'react';
import {
  Layout,
  Icon,
  Button,
} from 'antd';
import _ from 'lodash';

const {
  Content, Sider,
} = Layout;

const styles = {
  button: {
    cursor: 'default',
    color: '#aaa',
    borderColor: '#aaa',
  },
};

export default function HomeLayout(props) {
  const {
    LeftComp, RightComp,
  } = props;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        width={280}
        style={{ background: '#f0f2f5' }}
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
        <Content style={{ margin: '0 10px 0 0' }}>
          {RightComp}
        </Content>
      </Layout>
    </Layout>
  );
}
