import Dashboard from './page/admin/Dashboard';
import Profile from './page/admin/Profile';
import ProfileSetting from './page/admin/ProfileSetting';
import Login from './page/auth/Login';
import UserList from './page/admin/user/UserList';

export const adminRoutes = [
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/profile',
    component: Profile,
    exact: true,
  },
  {
    path: '/profile/setting',
    component: ProfileSetting,
  },
  {
    path: '/user/list',
    component: UserList,
  },
];

export const authRoutes = [
  {
    path: '/login',
    component: Login,
  },
];
