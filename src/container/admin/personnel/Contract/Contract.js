import React, { Component } from 'react';
import { Breadcrumb, Divider } from 'antd';
import { NavLink } from 'react-router-dom';

export default class Contract extends Component {
  render() {
    return (
      <>
       <Breadcrumb className={'MyBreadCrumb'} separator={<Divider type="vertical" />}>
          <Breadcrumb.Item>
            <NavLink to={'/admin/personnel/employees'}>Nhân viên</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <NavLink to={'/admin/personnel/contracts'}>Hợp đồng</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
          This is contract page
        </div>
      </>
    );
  }
}
