import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = Boolean(localStorage.getItem('authenticated'));

    return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default RedirectIfAuthenticated;
