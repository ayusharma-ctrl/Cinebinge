import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  return (
    <div>
        {window.localStorage.getItem("object") ? (
            <Outlet/>
        ) : (
            <Navigate to='/login' />
        )}
    </div>
  )
}

export default React.memo(PrivateRoutes)