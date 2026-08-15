import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Navbar() {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await api.post("/users/logout");
            navigate("/login");
        } catch (err) {
            console.error("Logout failed", err);
        }
    }

    return (
        <nav className="sidebar">
            <div className="logo">
                <span className="pulse-dot"></span>
                LeetPulse
            </div>
            <div className="sidebar-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/due">Due</Link>
                <Link to="/flagged">Flagged</Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;