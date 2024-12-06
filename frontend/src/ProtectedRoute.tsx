import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = Boolean(localStorage.getItem('authenticated'));
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
