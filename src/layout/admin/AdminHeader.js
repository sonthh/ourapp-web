import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Avatar, Row, Col } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { toggleMenu } from '../../action/appAction';
import { logout } from '../../util/auth';
import { Redirect, Link } from 'react-router-dom';
import { getCurrentUser } from '../../util/auth';

const { Header } = Layout;

class AdminHeader extends Component {

  state = {
    logout: false,
  }

  toggle = () => {
    this.props.toggleMenu();
  }

  onLogout = () => {
    logout();
    this.setState({ logout: true });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.currentUser) {
      const { currentUser } = nextProps;
      const { username, avatar } = currentUser;

      console.log(currentUser);

      localStorage.setItem('currentUser', JSON.stringify({ username, avatar }));
    }
  }

  userMenu = (currentUser) => (
    <Menu>
      <Menu.Item>
        <UserOutlined />
        <Link style={{ display: 'inline' }} to='/admin/profile'><span>{currentUser.username}</span></Link>
      </Menu.Item>
      <Menu.Item>
        <SettingOutlined />
        <Link style={{ display: 'inline' }} to='/admin/profile/setting'><span>Setting</span></Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={this.onLogout}>
        <LogoutOutlined />
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  notificationMenu = (
    <Menu>
      <Menu.Item>
        <UserOutlined />
        <span>Profile</span>
      </Menu.Item>
    </Menu>
  );

  render() {
    if (this.state.logout) {
      return <Redirect to={'/auth/login'} />
    }

    const currentUser = getCurrentUser();

    return (
      <Header className='site-layout-background' style={{ padding: 0 }}>
        <Row justify='space-between' >
          <Col>
            {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Col>
          <Col>
            <Dropdown overlay={this.notificationMenu} placement="bottomRight">
              <NotificationOutlined
                style={{
                  fontSize: '18px', lineHeight: '64px', padding: '0 24px',
                  cursor: 'pointer', transition: 'color 0.3s', color: '#1890ff'
                }} />
            </Dropdown>
            <Dropdown trigger={['click']} overlay={this.userMenu(currentUser)} placement="bottomRight">
              <Avatar style={{ lineHeight: '64px', cursor: 'pointer' }}
                src={currentUser.avatar} />
            </Dropdown>
          </Col>
        </Row>
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return {
    collapsed: state.app.collapsed,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
