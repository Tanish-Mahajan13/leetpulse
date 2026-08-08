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
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
            <h1>LeetPulse</h1>
            <div style={{ display: "flex", gap: "1rem" }}>
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={() => navigate("/register")}>Sign Up</button>
            </div>
        </div>
    );
}

export default Home;