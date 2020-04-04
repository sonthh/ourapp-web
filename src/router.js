import Dashboard from './page/admin/Dashboard';
import Profile from './page/admin/Profile';
import ProfileSetting from './page/admin/ProfileSetting';
import Login from './page/auth/Login';
import ProductList from './page/admin/product/ProductList';

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
    path: '/product/list',
    component: ProductList,
  },
];

export const authRoutes = [
  {
    path: '/login',
    component: Login,
  },
];
