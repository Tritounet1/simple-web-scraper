import { StrictMode } from 'react'
import { Provider } from './components/ui/provider';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx'
import Dashboard from './Dashboard.tsx';
import Login from "./Login.tsx";
import Navigation from "./Navigation.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated.tsx";

const Layout = () => (
    <div>
        <Navigation />
        <Outlet />
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RedirectIfAuthenticated>
                <Login />
            </RedirectIfAuthenticated>
        ),
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'home',
                element: (
                    <ProtectedRoute>
                        <App />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: '/*',
        element: <h1>Error 404</h1>,
    },
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);