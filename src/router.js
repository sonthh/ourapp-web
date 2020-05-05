import Dashboard from './container/admin/Dashboard';
import UserProfile from './container/user/UserProfile/UserProfile';
import UserSetting from './container/user/UserSetting/UserSetting';
import Login from './container/auth/Login/Login';
import UserList from './container/admin/user/UserList/UserList';
import ErrorPage from './container/admin/error/ErrorPage';
import PersonnelList from './container/admin/personnel/PersonnelList/PersonnelList';
import UserAdd from './container/admin/user/UserAdd/UserAdd';
import UserEdit from './container/admin/user/UserEdit/UserEdit';
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
    path: '/profile/:username',
    component: UserProfile,
    exact: true,
  },
  {
    path: '/setting',
    component: UserSetting,
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
