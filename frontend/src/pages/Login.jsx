import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await api.post("/users/login", formData);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Link to="/register">Need an account? Register</Link>
        </div>
    );
}

export default Login;