import React from 'react';
import {
  UserOutlined, DashboardOutlined, HomeOutlined, PieChartOutlined, TableOutlined, TeamOutlined
} from '@ant-design/icons';

export const menu = [
  {
    title: 'Home',
    icon: null,
    submenu: [
      {
        title: 'Dashboard',
        icon: <DashboardOutlined />,
        path: '/admin/dashboard',
      },
    ],
  },
  {
    title: 'User',
    icon: null,
    submenu: [
      {
        title: 'Manage',
        icon: <TableOutlined />,
        path: '/admin/user/manage',
      },
    ],
  },
  {
    title: 'Nhân sự',
    icon: null,
    submenu: [
      {
        title: 'Manage',
        icon: <TableOutlined />,
        path: '/admin/personnel/manage',
      },
    ],
  },
  {
    title: 'Chi nhánh',
    icon: null,
    submenu: [
      {
        title: 'Manage',
        icon: <TableOutlined />,
        path: '/admin/branch/manage',
      },
    ],
  },
];