import React, { Component } from 'react';
import { Menu } from 'antd';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

export default class MainMenu extends Component {

  render() {
    const { mode } = this.props;

    return (
      <Menu className='main-menu' theme='dark' defaultSelectedKeys={['1']} mode={mode}>
        <Menu.Item key='1'>
          <DashboardOutlined />
          <span>Dashboard</span>
        </Menu.Item>
        <SubMenu
          key='sub1'
          title={
            <span>
              <UserOutlined />
              <span>User</span>
            </span>
          }
        >
          <Menu.Item key='3'>
            <Link to='/admin/user/list'>List</Link>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to='/admin/user/add'>Add</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
