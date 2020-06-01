import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from '../../../action/authAction';
import { saveAuthData, checkAuth } from '../../../util/auth';
import './index.scss';

class Login extends Component {

  state = {
    isAuthenticated: false,
    loading: false,
  };

  onFinish = values => {
    const { username, password } = values;
    this.props.passwordLogin({ username, password });
  };

  componentDidUpdate(prevProps, prevState) {
    const { error, isAuthenticated, authData } = this.props;

    if (error && error !== prevProps.error) {
      return notification.error({
        message: 'Lỗi đăng nhập',
        description: 'Tên đăng nhập hoặc mật khẩu sai!',
      });
    }

    if (authData && authData !== prevProps.authData) {
      const { username, avatar, token } = authData;

      this.setState({ isAuthenticated });

      saveAuthData({ token, isAuthenticated, username, avatar });

      notification.success({
        duration: 2.5,
        message: `Chào ${username}`,
        description: 'Wellcom back!',
      });
    }
  }

  render() {
    if (this.state.isAuthenticated || checkAuth()) {
      const { state } = this.props.location;

      if (state && state.from) {
        return <Redirect to={state.from} />
      }

      return <Redirect to='/admin/dashboard' />
    }

    const { isLoading } = this.props;

    return (
      <Row style={{ minHeight: '100%' }} justify='space-around' align='middle' className='wrapper LoginContainer'>
        <Col sm={{ span: 10 }} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 6 }}>

          <Form
            autoComplete='off'
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true, username: 'admin', password: '123456' }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name='username'
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Username'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Password' />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Nhớ mật khẩu</Checkbox>
              </Form.Item>
              {/* <Link to='/auth/forgot'><span className='login-form-forgot'>Quên mật khẩu</span></Link> */}
            </Form.Item>

            <Form.Item>
              <Button loading={isLoading} type='primary' htmlType='submit' className='login-form-button'>
                Đăng nhập
                </Button>
              {/* <Link to='/auth/forgot' className='login-form-register'><span>Kh</span></Link> */}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    passwordLogin: (loginData) => dispatch(authAction.passwordLogin(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
