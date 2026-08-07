import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await api.post("/users/register", formData);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Link to="/login">Already have an account? Login</Link>
        </div>
    );
}

export default Register;