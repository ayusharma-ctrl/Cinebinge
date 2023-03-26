import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RestrictedRoutes = () => {
    return (
        <div>
            {window.localStorage.getItem("object") ? (
                <Navigate to='/' />
            ) : (
                <Outlet />
            )}
        </div>
    )
}

export default React.memo(RestrictedRoutes)