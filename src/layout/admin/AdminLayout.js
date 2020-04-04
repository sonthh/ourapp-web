import React, { Component } from 'react';
import { Layout, Drawer } from 'antd';
import { adminRoutes } from '../../router';
import { Switch, Redirect } from 'react-router-dom';
import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';
import { connect } from 'react-redux';
import AdminSidebar from './AdminSidebar';
import { PrivateRoute } from '../../util/get';
import { toggleMenu } from '../../action/appAction';
import MediaQuery from 'react-responsive'

const { Content, Sider } = Layout;

class AdminLayout extends Component {

  getRoutes = () => {
    return adminRoutes.map((prop, key) => {
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
  }

  onBreakpoint = (broken) => {
    if (broken === true && this.props.collapsed === false) {
      this.props.toggleMenu();
    }

    if (broken === false && this.props.collapsed === true) {
      this.props.toggleMenu();
    }
  }

  // each device has a different collapsedWidth
  renderSider = (collapsedWidth) => {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        breakpoint="lg"
        onBreakpoint={this.onBreakpoint}
        collapsedWidth={collapsedWidth}
      >
        <AdminSidebar />
      </Sider>
    )
  }

  onCloseSidebarDrawer = () => {
    this.props.toggleMenu();
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MediaQuery minWidth={768}>
          {this.renderSider(80)}
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <Drawer
            width={'auto'}
            bodyStyle={{ padding: '0', backgroundColor: '#001529' }}
            placement='left'
            closable={false}
            visible={!this.props.collapsed}
            onClose={this.onCloseSidebarDrawer}
          >
            {this.renderSider(0)}
          </Drawer>
        </MediaQuery>

        <Layout className='site-layout'>
          <AdminHeader />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              {this.getRoutes()}
              <Redirect from='*' to='/error/404' />
            </Switch>
          </Content>
          <AdminFooter />
        </Layout>
      </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
