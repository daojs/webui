import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Layout,
  Icon,
  Button,
  Menu,
} from 'antd';
import PropTypes from 'prop-types';

class Header extends React.PureComponent {
  onNavigate = ({ key }) => {
    if (key === this.props.location.pathname) {
      return;
    }
    this.props.history.push(key);
  }

  render() {
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
          onClick={this.onNavigate}
          selectedKeys={[this.props.location.pathname]}
          mode="horizontal"
          style={{ background: 'transparent', borderBottom: '0' }}
        >
          <Menu.Item key="/">
            <Icon type="dot-chart" />基础模块
          </Menu.Item>
          <Menu.Item key="/advanced">
            <Icon type="appstore-o" />进阶模块
          </Menu.Item>
          <Menu.Item key="/templates">
            <Icon type="gift" />模版
          </Menu.Item>
        </Menu>
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Header);
