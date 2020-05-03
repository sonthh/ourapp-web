import Dashboard from './container/admin/Dashboard';
import Profile from './container/admin/Profile';
import ProfileSetting from './container/admin/ProfileSetting';
import Login from './container/auth/Login';
import UserList from './container/admin/user/UserList';
import ErrorPage from './container/admin/error/ErrorPage';
import PersonnelList from './container/admin/personnel/PersonnelList';
import UserAdd from './container/admin/user/UserAdd';
import UserEdit from './container/admin/user/UserEdit';
import PersonnelForm from './container/admin/personnel/PersonnelForm';

export const adminModalRoutes = [
  {
    path: '/user/manage/:id/edit',
    component: UserEdit,
  },
  {
    path: '/user/manage/add',
    component: UserAdd,
  },
  {
    path: '/personnel/manage/:id/edit',
    component: PersonnelForm,
  },
  {
    path: '/personnel/manage/add',
    component: PersonnelForm,
  },
];

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
