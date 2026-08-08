import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";

function ProtectedRoute({ children }) {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        api.get("/users/me")
            .then(() => setIsAuth(true))
            .catch(() => setIsAuth(false));
    }, []);

    if (isAuth === null) return <p>Loading...</p>;
    if (isAuth === false) return <Navigate to="/login" />;

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

export default ProtectedRoute;