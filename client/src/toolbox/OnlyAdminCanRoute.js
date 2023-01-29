import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const OnlyAdminCanRoute = () => {
    // täytyy korjata niin, että tokilta saadaan
    const user = JSON.parse(localStorage.getItem("profile"));
    /*const [ isAdmin ,setIsAdmin ] = useState(false); 
    const location = useLocation();

    useEffect(() => {
        if (user?.token) {
            const decodedToken = jwtDecode(user.token);
            if (decodedToken.isAdmin === true) {
                setIsAdmin(decodedToken.isAdmin)
            }
        }
        console.log(user)
    }, [location])*/

    return (
        user?.token && (user?.result?.isAdmin === true) ? <Outlet /> : <Navigate to="/Admin" />
    )
}

export default OnlyAdminCanRoute