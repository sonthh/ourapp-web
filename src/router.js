import Dashboard from './page/admin/Dashboard';
import Profile from './page/admin/Profile';
import ProfileSetting from './page/admin/ProfileSetting';
import Login from './page/auth/Login';
import UserList from './page/admin/user/UserList';
import ErrorPage from './page/admin/error/ErrorPage';

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
  {
    path: '/error/:errorCode',
    component: ErrorPage,
  },
];

export const authRoutes = [
  {
    path: '/login',
    component: Login,
  },
];
