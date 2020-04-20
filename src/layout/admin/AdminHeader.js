import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Avatar, Row, Col } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { toggleMenu } from '../../action/appAction';
import { logout } from '../../util/auth';
import { Redirect, Link } from 'react-router-dom';
import { getCurrentUser } from '../../util/auth';
import Notice from '../../component/common/Notice';
import MainMenu from './MainMenu';

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
    <Menu className='menu-avatar'>
      <Menu.Item className='menu-item-avatar'>
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

    let headerStyle = { padding: 0 };
    // mode: vertical
    let leftHeader = (
      <Col>
        {this.renderToggleIcon()}
      </Col>
    );
    if (this.props.mode === 'horizontal') {
      headerStyle = { ...headerStyle, position: 'fixed', zIndex: 1, width: '100%' };
      leftHeader = (
        <>
          <Col>
            <div className='logo-header' />
          </Col>
          <Col>
            <MainMenu mode='horizontal' />
          </Col>
        </>
      );
    }

    return (
      <Header style={headerStyle} className='site-layout-background'>
        <Row justify='space-between'>
          {leftHeader}
          <Col>
            <Notice />
            <Dropdown trigger={['click']} overlay={this.userMenu(currentUser)} placement="bottomRight">
              <div className='menu-avatar-wrapper'>
                <Avatar style={{ top: '-4px' }} size='small' src={currentUser.avatar} />
              </div>
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
