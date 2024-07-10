import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import Media from 'src/pages/admin/Media';
import Password from 'src/pages/admin/Password';
import Passwords from 'src/pages/user/Passwords';
import Members from 'src/pages/superadmin/Members';
import DashboardLayout from 'src/layouts/dashboard';
import TotalAdmins from 'src/pages/superadmin/TotalAdmins';

import RegisterView from 'src/sections/login/RegisterView';

// import { AppView } from 'src/sections/overview/view';
// import ClientDetails from 'src/sections/user/ClientDetails';

export const IndexPage = lazy(() => import('src/pages/admin/app'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/admin/user'));
export const LoginPage = lazy(() => import('src/pages/admin/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/admin/page-not-found'));
export const ClientDetails = lazy(() => import('src/sections/admin-table/ClientDetails'));
export const PaymentSettings = lazy(() => import('src/pages/superadmin/PaymentSettings'));
export const DeletePassword = lazy(() => import('src/pages/superadmin/DeletePassword'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout userRole="admin">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'admin-table', element: <UserPage /> },
        { path: 'password', element: <Password/> },
        { path: 'clientinfo', element: <ClientDetails />},
        { path: 'media', element: <Media/>}
      ],
    },
    {
      path: 'superadmin',
      element: (
        <DashboardLayout userRole="superadmin">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'payment', element: <PaymentSettings />},
        { path: 'delete-password', element: <DeletePassword /> },
        { path: 'admins', element: <TotalAdmins />},
        { path: 'members', element: <Members /> },
        { path: 'media-account', element: <Media /> },
      ],
    },
    {
      path: 'user',
      element: (
        <DashboardLayout userRole="user">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <Passwords />, index:true  },
        { path:'media-account', element: <Media />}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'register', 
      element: <RegisterView /> },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'app',
      element: <IndexPage />
    }
  ]);

  return routes;
}
