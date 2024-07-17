import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const adminRoutes = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Brands',
    path: 'brand',
    icon: icon('box'),
  },
  {
    title: 'Subscriptions',
    path: 'subscription',
    icon: icon('ic_cart'),
  },
  {
    title: 'Vault',
    path: 'agency',
    icon: icon('ic_user'),
  },
  {
    title: 'Logs',
    path: '/logs',
    icon: icon('ic_lock'),
  },
];

const superAdminRoutes = [
  {
    title: 'dashboard',
    path: '/superadmin',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Payment Settings',
    path: '/superadmin/payment',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Delete Password',
  //   path: '/superadmin/delete-password',
  //   icon: icon('ic_delete_password'),
  // },
  {
    title: 'Admins',
    path: '/superadmin/admins',
    icon: icon('ic_admin'),
  },
  {
    title: 'Media Account',
    path: '/superadmin/media-account',
    icon: icon('ic_medias'),
  },
  {
    title: 'Logout',
    path: '/login',
    icon: icon('ic_login'),
  },
];

const userRoutes = [
  {
    title: 'Passwords',
    path: '/user',
    icon: icon('ic_lock')
  },
  {
    title: 'Logout',
    path: '/login',
    icon: icon('ic_login'),
  },
];

const navConfig = (userRole) => {
  switch (userRole) {
    case 'superadmin':
      return superAdminRoutes;
    case 'user':
      return userRoutes;
    default:
      return adminRoutes;
  }
};

export default navConfig;
