import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Avatar, Row, Col, Badge } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  BellTwoTone,
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentUser && this.props.currentUser !== prevProps.currentUser) {
      const { currentUser } = this.props;
      const { username, avatar } = currentUser;

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

  renderToggleIcon = () => {
    if (this.props.collapsed) {
      return (<MenuUnfoldOutlined className='trigger' onClick={this.toggle} />);
    }
    return (<MenuFoldOutlined className='trigger' onClick={this.toggle} />);
  }

  render() {
    if (this.state.logout) {
      return <Redirect to={'/auth/login'} />
    }
    const currentUser = getCurrentUser();

    return (
      <Header className='site-layout-background' style={{ padding: 0 }}>
        <Row justify='space-between' >
          <Col>
            {this.renderToggleIcon()}
          </Col>
          <Col>
            <Dropdown trigger={['click']} style overlay={this.notificationMenu} placement="bottomRight">
              <Badge count={5}>
                <BellTwoTone
                  className='notificationIcon'
                  style={{
                    fontSize: '22px', alignItems: 'center', borderRadius: '50%',
                    cursor: 'pointer', transition: 'color 0.3s', color: '#1890ff',
                    padding: '8px',
                  }}
                />
              </Badge>
            </Dropdown>
            <Dropdown trigger={['click']} overlay={this.userMenu(currentUser)} placement="bottomRight">
              <Avatar style={{ lineHeight: '64px', cursor: 'pointer', marginLeft: '20px' }}
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
