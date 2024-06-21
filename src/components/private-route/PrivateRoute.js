import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!accessToken || !roles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
