import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Avatar, Row, Col } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { toggleMenu } from '../../action/appAction';
import { logout, getCurrentUser } from '../../util/auth';
import { Redirect, Link } from 'react-router-dom';
import Notice from '../../component/common/Notice';
import MainMenu from './MainMenu';
import PropTypes from 'prop-types';

const { Header } = Layout;

class AdminHeader extends Component {

  state = {
    logout: false,
    authData: getCurrentUser(),
  }

  toggle = () => {
    this.props.toggleMenu();
  }

  onLogout = () => {
    logout();
    this.setState({ logout: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const { authData } = this.props;

    if (authData && authData !== prevProps.authData) {
      this.setState({ authData: authData });
    }
  }

  renderToggleIcon = () => {
    if (this.props.collapsed) {
      return (<MenuUnfoldOutlined className='trigger' onClick={this.toggle} />);
    }
    return (<MenuFoldOutlined className='trigger' onClick={this.toggle} />);
  };

  render() {
    if (this.state.logout) {
      return <Redirect to={'/auth/login'} />
    }

    const { mode } = this.props;
    const { authData } = this.state;

    let headerStyle = { padding: 0 };
    // mode: vertical
    let leftHeader = (
      <Col>
        {this.renderToggleIcon()}
      </Col>
    );

    if (mode === 'horizontal') {
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

    const userMenu = (
      <Menu className='menu-avatar'>
        <Menu.Item>
          <SettingOutlined />
          <Link style={{ display: 'inline' }} to='/admin/setting'><span>Setting</span></Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={this.onLogout}>
          <LogoutOutlined />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header
        style={headerStyle}
        className={`${mode !== 'horizontal' ? 'site-header-background' : ''} AdminHeaderContainer`}
      >
        <Row justify='space-between'>
          {leftHeader}
          <Col>
            <Notice />
            <Dropdown trigger={['click']} overlay={userMenu} placement="bottomRight">
              <div className='menu-avatar-wrapper'>
                <Avatar style={{ top: '-4px' }} size='small' src={authData.avatar} />
              </div>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    );
  }
}

AdminHeader.propTypes = {
  mode: PropTypes.string,
};

const mapStateToProps = ({ app, auth }) => {
  const { authData } = auth;
  const { collapsed } = app;
  return {
    collapsed,
    authData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu: () => dispatch(toggleMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
