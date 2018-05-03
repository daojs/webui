import React from 'react';
import {
  Layout,
} from 'antd';

const {
  Content, Sider,
} = Layout;

const styles = {
  button: {

  },
  bg: {
    background: '#f0f2f5',
  },
};

export default function HomeLayout(props) {
  const {
    LeftComp, RightComp,
  } = props;

  return (
    <Layout>
      <Sider
        trigger={null}
        width={280}
        style={styles.bg}
      >
        <div
          style={{ padding: '10px' }}
        >
          {LeftComp}
        </div>
      </Sider>
      <Content style={{ margin: '0 10px 0 0' }}>
        {RightComp}
      </Content>
    </Layout>
  );
}
