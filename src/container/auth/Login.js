import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from '../../action/authAction';
import { checkAuth, saveAuthData } from '../../util/auth';

class Login extends Component {

  state = {
    loading: false,
  }

  onFinish = values => {
    const { username, password } = values;
    this.props.passwordLogin({ username, password });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth && this.props.auth !== prevProps.auth) {
      const { token, error, isLoading, isAuthenticated, username, avatar } = this.props.auth;

      if (isLoading !== undefined) {
        this.setState({ loading: isLoading });
      }

      if (error) {
        return notification.error({
          message: 'Login failed',
          description: 'Username or password is incorrect!',
        });
      }

      if (token && isAuthenticated) {
        saveAuthData({ token, isAuthenticated, username, avatar });

        notification.success({
          duration: 2.5,
          message: `Hi ${username}`,
          description: 'Wellcom back!',
        });
      }
    }
  }

  render() {
    if (checkAuth()) {
      const { state } = this.props.location;

      if (state && state.from) {
        return <Redirect to={state.from} />
      }

      return <Redirect to='/admin/dashboard' />
    }

    return (
      <Row style={{ minHeight: '100%' }} justify='space-around' align='middle' className='wrapper'>
        <Col sm={{ span: 10 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>

          <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name='username'
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
            <Input.Password  prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Password'/>
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to='/auth/forgot'><span className='login-form-forgot'>Forgot password</span></Link>
            </Form.Item>

            <Form.Item>
              <Button loading={this.state.loading} type='primary' htmlType='submit' className='login-form-button'>
                Log in
                  </Button>
              <Link to='/auth/forgot' className='login-form-register'><span>Don't have account</span></Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    passwordLogin: (loginData) => {
      dispatch(authAction.passwordLogin(loginData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
