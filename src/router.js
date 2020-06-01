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
import BranchList from './container/admin/branch/BranchList/BranchList';
import BranchAdd from './container/admin/branch/BranchAdd/BranchAdd';
import BranchEdit from './container/admin/branch/BranchEdit/BranchEdit';
import Contract from './container/admin/personnel/Contract/Contract';
import PersonnelCreate from './container/admin/personnel/PersonnelCreate/PersonnelCreate';
import RequestList from './container/admin/request/RequestList/RequestList';
import TimeKeeping from './container/admin/working/TimeKeeping/TimeKeeping';
import ContractCreate from './container/admin/personnel/ContractCreate/ContractCreate';
import PersonnelUpdate from './container/admin/personnel/PersonnelUpdate/PersonnelUpdate';
import PermissionSetting from './container/admin/role/PermissionSetting/PermissionSetting';

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
  {
    path: '/branch/manage/add',
    component: BranchAdd,
  },
  {
    path: '/branch/manage/:id/edit',
    component: BranchEdit,
  },
];

export const adminRoutes = [
  {
    path: '/branch/manage',
    component: BranchList,
    exact: true,
  },
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
    path: '/user/manage',
    component: UserList,
    exact: true,
  },
  {
    path: '/personnel/create',
    component: PersonnelCreate,
  },
  {
    path: '/personnel/:id/update',
    component: PersonnelUpdate,
  },
  {
    path: '/personnel/employees',
    component: PersonnelList,
  },
  {
    path: '/personnel/contracts',
    component: Contract,
    exact: true,
  },
  {
    path: '/personnel/contracts/create',
    component: ContractCreate,
  },
  {
    path: '/working-day/timekeeping',
    component: TimeKeeping,
  },
  {
    path: '/personnel/request',
    component: RequestList,
  },
  {
    path: '/setting',
    component: UserSetting,
    exact: true,
  },
  {
    path: '/setting/permission',
    component: PermissionSetting,
    exact: true,
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
