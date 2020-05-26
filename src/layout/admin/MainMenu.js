import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { menu } from '../../menu';
import PropTypes from 'prop-types';

const { SubMenu } = Menu;

export default class MainMenu extends Component {

  render() {
    const { mode } = this.props;

    const mainMenu = menu.map((menu, menuIndex) => {

      const sub = menu.submenu.map((subMenu, subMenuIndex) => (
        <Menu.Item key={menu.title + '.' + menuIndex + '.' + subMenuIndex}>
          {subMenu.icon}
          <Link to={subMenu.path}>{subMenu.title}</Link>
        </Menu.Item>
      ));

      const title = (
        <span>
          {menu.icon}
          <span>{menu.title}</span>
        </span>
      );

      if (menu.submenu.length > 0) {
        return (
          <SubMenu
            key={menu.title + '.' + menuIndex}
            title={title}
          >
            {sub}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={menu.title + '.' + menuIndex}>
          {menu.icon}
          <Link to={menu.path}>{menu.title}</Link>
        </Menu.Item>
      );

    });

    return (
      <Menu className='main-menu' theme='dark' defaultSelectedKeys={['1']} mode={mode}>
        {mainMenu}
      </Menu>
    );
  }
}

MainMenu.propTypes = {
  mode: PropTypes.string.isRequired,
};
