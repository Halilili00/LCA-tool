import React from 'react'
import { Navigate, Outlet} from 'react-router-dom';

export const PrivateRoutes = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    return (
        user?.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes
