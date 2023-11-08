import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "./context/UserContext";
export default function Protected({ children, role }) {
    const { checkLoggedIn, getUserData } = UserAuth();
    const hasUser = checkLoggedIn();
    if (hasUser) {
        const userData = getUserData();
        // const userData = JSON.parse(getData);
        const { idPermission } = userData;
        const path = idPermission === 0 ? "/" : "/category";
        return idPermission === role ? children : <Navigate to={path} />;
    }
    return <Navigate to="/login" />;
}
