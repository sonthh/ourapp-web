import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default class AdminFooter extends Component {

  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>Copyright ©2020 Created by Ourapp</Footer>
    );
  }
}
