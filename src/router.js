import Dashboard from './page/admin/Dashboard';
import Profile from './page/admin/Profile';
import ProfileSetting from './page/admin/ProfileSetting';
import Login from './page/auth/Login';
import UserList from './page/admin/user/UserList';
import ErrorPage from './page/admin/error/ErrorPage';
import PersonnelList from './page/admin/personnel/PersonnelList';

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
    path: '/user/manage',
    component: UserList,
  },
  {
    path: '/personnel/manage',
    component: PersonnelList,
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
