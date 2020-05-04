import React, { Component } from 'react';
import { Layout, Avatar } from 'antd';
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
        <Footer style={{ textAlign: 'center' }}>
          Copyright ©2020 Created by&nbsp;
          <Avatar src="https://res.cloudinary.com/ourapp-upload/image/upload/v1588564716/67403831_2356011294616988_4352344051870072832_o_uixydl.jpg" />
          <Avatar src="https://res.cloudinary.com/ourapp-upload/image/upload/v1588564799/53899643_2012404435732649_5572488971549671424_n_whci1t.jpg" />
          <Avatar src="https://res.cloudinary.com/ourapp-upload/image/upload/v1588564892/58462971_1150803888432699_5280383882061938688_n_wpauci.jpg" />
          <Avatar src="https://res.cloudinary.com/ourapp-upload/image/upload/v1588564892/60449197_1180051765507833_4261348095893176320_n_c7y7tm.jpg" />
        </Footer>
      </Layout>
    );
  }
}
