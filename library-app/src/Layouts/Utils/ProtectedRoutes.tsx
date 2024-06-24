import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export const ProtectedRoutes = () => {
    const {isLoggedIn} = useAuth();

    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    );
}




