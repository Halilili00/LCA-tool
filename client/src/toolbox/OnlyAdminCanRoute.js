import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const OnlyAdminCanRoute = () => {
    // täytyy korjata niin, että tokilta saadaan
    const user = JSON.parse(localStorage.getItem("profile"));
    /*const [isAdmin, setIsAdmin] = useState(false)
    const Admin = () => {
        if (user) (
            setIsAdmin(jwtDecode(user?.token).isAdmin)
        )
    }
    console.log(isAdmin)*/

    return (
        user?.token && (user?.result.isAdmin === true) ? <Outlet /> : <Navigate to="/Admin" />
    )
}

export default OnlyAdminCanRoute