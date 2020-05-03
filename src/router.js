import Dashboard from './page/admin/Dashboard';
import Profile from './page/admin/Profile';
import ProfileSetting from './page/admin/ProfileSetting';
import Login from './page/auth/Login';
import UserList from './page/admin/user/UserList';
import ErrorPage from './page/admin/error/ErrorPage';
import PersonnelList from './page/admin/personnel/PersonnelList';
import UserForm from './component/user/UserForm';

export const adminModalRoutes = [
  {
    path: '/user/manage/:id/edit',
    component: UserForm,
  },
  {
    path: '/user/manage/add',
    component: UserForm,
  },
]

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
    exact: true,
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
