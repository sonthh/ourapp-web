import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
export default class Profile extends Component {

  render() {
    return (
      <>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
          This is profile page
        </div>
      </>
    );
  }
}
