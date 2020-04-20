import React, { Component } from 'react';
import { Layout, Drawer } from 'antd';
import { adminRoutes } from '../../router';
import { Switch, Redirect } from 'react-router-dom';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';
import { connect } from 'react-redux';
import { PrivateRoute } from '../../util/get';
import * as appAction from '../../action/appAction';
import MainMenu from './MainMenu';
import responsive from '../../constant/responsive'

const { Content, Sider } = Layout;

const AdminRoutes = adminRoutes.map((prop, key) => {
  let exact = false;

  if (prop.exact) {
    exact = prop.exact;
  }

  return (
    <PrivateRoute
      path={'/admin' + prop.path}
      component={prop.component}
      key={key}
      exact={exact}
    />
  )
});

class AdminLayout extends Component {

  state = {
    collapsedWidth: 80,
    useDrawer: false,
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize = () => {
    const { innerWidth } = window;
    const isLargeScreen = innerWidth >= responsive.md;
    const collapsedWidth = isLargeScreen ? 80 : 0;
    const useDrawer = isLargeScreen ? false : true;

    if (collapsedWidth !== this.state.collapsedWidth) {
      this.setState({ collapsedWidth });
    }

    if (useDrawer !== this.state.useDrawer) {
      this.setState({ useDrawer });
      if (!isLargeScreen) {
        this.props.changeNavigationMode('horizontal');
      }
    }
  }

  onBreakpoint = (broken) => {
    if (broken === true && this.props.collapsed === false) {
      this.props.toggleMenu();
    }

    if (broken === false && this.props.collapsed === true) {
      this.props.toggleMenu();
    }
  }

  onCloseSidebarDrawer = () => {
    this.props.toggleMenu();
  }

  render() {
    const sider = (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        breakpoint="lg"
        onBreakpoint={this.onBreakpoint}
        collapsedWidth={this.state.collapsedWidth}
      >
        <div className="logo" />
        <MainMenu mode='inline' />
      </Sider>
    );

    const siderWithDrawer = this.state.useDrawer ?
      (
        <Drawer
          width={'auto'}
          bodyStyle={{ padding: '0', backgroundColor: '#001529' }}
          placement='left'
          closable={false}
          visible={!this.props.collapsed}
          onClose={this.onCloseSidebarDrawer}
        >
          {sider}
        </Drawer>
      ) : sider;

    if (this.props.navigationMode === 'horizontal' && this.state.useDrawer === false) {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <AdminHeader mode='horizontal' />
          <Layout className='site-layout site-layout-horizontal'>
            <Content style={{ margin: '5px 16px' }}>
              <Switch>
                {AdminRoutes}
                <Redirect from='*' to='/admin/error/404' />
              </Switch>
            </Content>
            <AdminFooter />
          </Layout>
        </Layout>
      );
    }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        {siderWithDrawer}
        <Layout className='site-layout site-layout-vertical'>
          <AdminHeader mode='vertical' />
          <Content style={{ margin: '5px 16px' }}>
            <Switch>
              {AdminRoutes}
              <Redirect from='*' to='/admin/error/404' />
            </Switch>
          </Content>
          <AdminFooter />
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  const { collapsed, navigationMode } = state.app;
  return {
    collapsed,
    navigationMode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMenu: () => {
      dispatch(appAction.toggleMenu());
    },
    changeNavigationMode: (navigationMode) => {
      dispatch(appAction.changeNavigationMode(navigationMode));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
