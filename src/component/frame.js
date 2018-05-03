import React from 'react';
import {
  Layout,
} from 'antd';
import Header from './header';

export default function Frame(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      { props.children }
    </Layout>
  );
}
