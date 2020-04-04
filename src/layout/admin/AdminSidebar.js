import React, { Component } from 'react';
import { Menu } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  DashboardOutlined,

} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export default class AdminSidebar extends Component {

  render() {
    return (
      <>
        <div className="logo" />
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1'>
            <DashboardOutlined />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <DesktopOutlined />
            <span>Profile</span>
          </Menu.Item>
          <SubMenu
            key='sub1'
            title={
              <span>
                <UserOutlined />
                <span>Product</span>
              </span>
            }
          >
            <Menu.Item key='3'>
              <Link to='/admin/product/list'>List</Link>
            </Menu.Item>
            <Menu.Item key='4'>
              <Link to='/admin/product/add'>Add</Link>
            </Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key='sub2'
            title={
              <span>
                <TeamOutlined />
                <span>Team</span>
              </span>
            }
          >
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9'>
            <FileOutlined />
          </Menu.Item>
        </Menu>
      </>
    );
  }
}
