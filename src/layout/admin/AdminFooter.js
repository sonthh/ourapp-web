import React, { Component } from 'react';
import { Layout } from 'antd';
import Setting from './Setting';

const { Footer } = Layout;

export default class AdminFooter extends Component {

  render() {
    return (
      <>
        <Setting />
        <Footer style={{ textAlign: 'center' }}>Copyright ©{new Date().getFullYear()} Created by team 1</Footer>
      </>
    );
  }
}
