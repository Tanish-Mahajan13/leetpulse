import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

function ProtectedRoute({ children }) {
    const [isAuth, setIsAuth] = useState(null); // null = still checking

    useEffect(() => {
        api.get("/users/me")
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false));
    }, []);

    if (isAuth === null) return <p>Loading...</p>;
    if (isAuth === false) return <Navigate to="/login" />;
    return children;
}

export default ProtectedRoute;