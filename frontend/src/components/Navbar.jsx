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
            <div className="sidebar-bottom">
                <Link to="/profile" className="profile-link">
                    <span className="sidebar-avatar">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                        </svg>
                    </span>
                    Profile
                </Link>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;