import React from 'react'
import { Navigate } from 'react-router';

const ProtectedAdminRoute = ({ children }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }


  return children
}

export default ProtectedAdminRoute