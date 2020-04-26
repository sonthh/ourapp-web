import React, { Component } from 'react';
import { Button } from 'antd';
import Exception from 'ant-design-pro/lib/Exception';
import CountDown from 'ant-design-pro/lib/CountDown';
import { time } from '../../../constant/time'
import { Link, Redirect } from 'react-router-dom';

const timeToRedirect = time.timeToRedirect;

export default class ErrorPage extends Component {

  state = {
    errorCode: '404',
  }

  componentDidMount() {
    const { match } = this.props;

    if (match) {
      const { errorCode } = match.params;

      this.setState({
        errorCode,
      });
    }

    setTimeout(() => {
      if (window.location.href.includes('/admin/error/')) {
        this.props.history.push('/admin/dashboard');
      }
    }, timeToRedirect);
  }

  render() {
    const errorCodes = ['404', '403', '500'];
    let { errorCode } = this.state;
    const redirect = '/admin/dashboard';
    let description = '';
    const targetTime = new Date().getTime() + timeToRedirect;
    const actions = (
      <div>
        <Button type="primary"><Link to='/admin/dashboard'>Back home</Link></Button>
        <CountDown style={{ fontSize: 20 }} target={targetTime} />
      </div>
    );

    if (!errorCodes.includes(errorCode)) {
      return (<Redirect to='/admin/error/404' />);
    }

    if (errorCode === '403') {
      description = `Sorry, you don't have access to this page.`;
    }

    if (errorCode === '404') {
      description = `Sorry, the page you visited does not exist.`;
    }

    if (errorCode === '500') {
      description = `Sorry, the server is reporting an error.`;
    }

    return (
      <Exception
        type={errorCode}
        desc={description}
        actions={actions}
        redirect={redirect}
        backText='Back home'
      />
    );
  }
}
