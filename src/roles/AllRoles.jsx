import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Home from "./Home";

import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import PrivateRoute from "./PrivateRoute";
import SalesLeft from "../sales-manager/left-bar/SalesLeft.jsx";

function AllRoles() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/home" element={<PrivateRoute roles={['Whsmanager']}><Home /></PrivateRoute>} />
                <Route path="/sales-manager" element={<PrivateRoute roles={['Seller']}><SalesLeft /></PrivateRoute>} />
                {/*<Route path="/admin-dashboard" element={<PrivateRoute roles={['Admin']}><AdminDashboard /></PrivateRoute>} />*/}
                {/*<Route path="/user-dashboard" element={<PrivateRoute roles={['User']}><UserDashboard /></PrivateRoute>} />*/}
            </Routes>
        </Router>
    );
}

export default AllRoles;
