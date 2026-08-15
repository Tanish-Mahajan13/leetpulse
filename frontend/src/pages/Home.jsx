import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Home() {
    const navigate = useNavigate();

    async function handleLoginClick() {
        try {
            await api.get("/users/me");
            navigate("/dashboard");
        } catch (err) {
            navigate("/login");
        }
    }

    return (
        <div className="home-hero">
            <div className="logo">
                <span className="pulse-dot"></span>
                <h1>LeetPulse</h1>
            </div>
            <p>Solve it once. Get reminded before you forget it.</p>
            <div className="home-actions">
                <button className="btn-primary" onClick={handleLoginClick}>Login</button>
                <button className="btn-secondary" onClick={() => navigate("/register")}>Sign Up</button>
            </div>
        </div>
    );
}

export default Home;