import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { getRole } from '../../Service/AuthService';

export const ProtectedRoutesAdmin = () => {
    const role = getRole();
    const isAdmin = (role == 'ROLE_ADMIN') ? true : false;
    return(
        isAdmin ? <Outlet/> : <p>Access Denied</p>
    );
}