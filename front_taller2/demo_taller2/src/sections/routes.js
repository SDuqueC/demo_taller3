import {useContext, lazy, Suspense} from "react";
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import CircularProgress from '@mui/material/CircularProgress';
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import UserLayout from '../layouts/user';
import NotFoundPage from "../pages/page-not-found";
import DashboardAppPage from "../pages/DashboardAppPage";

//

// Importa otros componentes con lazy
const UserPage = lazy(() => import('../pages/UserPage'));

// Importa estados con lazy
const UserState = lazy(() => import('../hooks/user/UserState'));



// ----------------------------------------------------------------------

const fallbackStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  // Ajusta según tus necesidades
};


const AppSuspense = ({ children }) => (
    <Suspense fallback={<div style={fallbackStyles}><CircularProgress size={60} thickness={4} /></div>}>
        {children}
    </Suspense>
);

export default function Router() {
    const redirectToDashboard = () => <Navigate to="/dashboard" replace />;

    const redirectToUser = () => <Navigate to="/usuario" replace />;

    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: 'app', element: <AppSuspense><DashboardAppPage /></AppSuspense> },
                { path: 'usuarios', element: <AppSuspense><UserState><UserPage /></UserState></AppSuspense> },
            ]
        },
        {
            path: '/usuario',
            element: <UserLayout />,
        },
        {
            element: <SimpleLayout />,
            children: [
                { path: '/404', element: <NotFoundPage /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,
        },
    ]);

    return routes;
}