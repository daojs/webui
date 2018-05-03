import React from 'react';
import {
  Layout,
  Icon,
  Button,
  Menu,
} from 'antd';

export default function Header() {
  return (
    <Layout.Header
      style={{
          background: '#f0f2f5',
          display: 'flex',
          flexDirection: 'row',
          height: '50px',
          borderBottom: '1px solid #E8E8E8',
          alignItems: 'center',
        }}
    >
      <div style={{
            backgroundImage: 'url(http://daojs.koreasouth.cloudapp.azure.com/img/logo.png)',
            width: '50px',
            height: '90%',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
      />
      <Button
        ghost
        style={{
            marginRight: '40px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'default',
            color: '#666',
            border: '0',
          }}
      >
          Dao Registry
      </Button>
      <Menu
          // onClick={this.handleClick}
          // selectedKeys={[this.state.current]}
        mode="horizontal"
        style={{ background: 'transparent', borderBottom: '0' }}
      >
        <Menu.Item key="basic-modules">
          <Icon type="mail" />基础模块
        </Menu.Item>
        <Menu.Item key="advanced-modules">
          <Icon type="appstore" />进阶模块
        </Menu.Item>
        <Menu.Item key="templates">
          <Icon type="appstore" />模版
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}
