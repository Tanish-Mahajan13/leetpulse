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
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/due">Due</Link>
            <Link to="/flagged">Flagged</Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;