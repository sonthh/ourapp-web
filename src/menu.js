import React from 'react';
import {
  UserOutlined, DashboardOutlined, HomeOutlined, PieChartOutlined, TableOutlined, TeamOutlined
} from '@ant-design/icons';

export const menu = [
  {
    title: 'Home',
    icon: <HomeOutlined />,
    submenu: [
      {
        title: 'Dashboard',
        icon: <DashboardOutlined />,
        path: '/admin/dashboard',
      },
      {
        title: 'Statistics',
        icon: <PieChartOutlined />,
        path: '/admin/statistics',
      },
    ],
  },
  {
    title: 'User',
    icon: <UserOutlined />,
    submenu: [
      {
        title: 'Manage',
        icon: <TableOutlined />,
        path: '/admin/user/manage',
      },
      {
        title: 'Statistics',
        icon: <PieChartOutlined />,
        path: '/admin/user/statistics',
      },
    ],
  },
  {
    title: 'Personnel',
    icon: <TeamOutlined />,
    submenu: [
      {
        title: 'Manage',
        icon: <TableOutlined />,
        path: '/admin/personnel/manage',
      },
      {
        title: 'Statistics',
        icon: <PieChartOutlined />,
        path: '/admin/personnel/statistics',
      },
    ],
  },
  {
    title: 'Branch',
    icon: <TeamOutlined />,
    submenu: [
      {
        title: 'Manage',
        icon: <TableOutlined />,
        path: '/admin/branch/manage',
      },
      {
        title: 'Statistics',
        icon: <PieChartOutlined />,
        path: '/admin/branch/statistics',
      },
    ],
  },
];