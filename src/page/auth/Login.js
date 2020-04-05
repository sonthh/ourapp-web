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

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.auth && nextProps.auth !== this.props.auth) {
      const { token, error, isLoading, isAuthenticated, username, avatar } = nextProps.auth;

      if (isLoading !== undefined) {
        this.setState({ loading: isLoading });
      }

      if (error) {
        return notification.error({
          message: 'Login faild',
          description: 'Username or password is incorrect!',
        });
      }

      if (token && isAuthenticated) {
        saveAuthData({ token, isAuthenticated, username, avatar });
      }
    }
  }

  render() {
    if (checkAuth()) {
      return <Redirect to={'/admin/dashboard'} />
    }

    return (
      <>
        <Row style={{ minHeight: '100%' }} justify='space-around' align='middle'>
          <Col sm={{ span: 10 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 7 }}>

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
                <Input
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                />
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
                Or <Link to='/auth/forgot'><span className='login-form-forgot'>Register now</span></Link>
              </Form.Item>
            </Form>

          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    passwordLogin: (loginData) => {
      dispatch(authAction.passwordLogin(loginData));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
