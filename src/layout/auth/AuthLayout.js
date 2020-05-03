import React, { Component } from 'react';
import { Layout } from 'antd';
import { authRoutes } from '../../router';
import { Route, Switch, Redirect } from 'react-router-dom';

const { Content, Footer } = Layout;

export default class AuthLayout extends Component {

  getRoutes = () => (authRoutes.map((prop, key) =>
    <Route
      path={'/auth' + prop.path}
      component={prop.component}
      key={key}
    />
  ));

  render() {
    return (
      <Layout className='layout' style={{ height: "100vh" }}>
        <Content style={{ padding: '0 50px' }}>
          <Switch>
            {this.getRoutes()}
            <Redirect from='*' to='/auth/login' />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Copyright ©2020 Created by team1</Footer>
      </Layout>
    );
  }
}
