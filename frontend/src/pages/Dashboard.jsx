import { useState, useEffect } from "react";
import api from "../api/axios";

function Dashboard() {
    const [problems, setProblems] = useState([]);
    const [formData, setFormData] = useState({ title: "", url: "", code: "", difficulty: "Easy", comment: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProblems();
    }, []);

    async function fetchProblems() {
        try {
            const res = await api.get("/problems/getProblems");
            setProblems(res.data.problems);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load problems");
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await api.post("/problems/addProblem", formData);
            setFormData({ title: "", url: "", code: "", difficulty: "Easy", comment: "" });
            fetchProblems();
        } catch (err) {
            setError(err.response?.data?.message || "Could not add problem");
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                <input type="text" name="url" placeholder="URL" value={formData.url} onChange={handleChange} />
                <textarea name="code" placeholder="Your code" value={formData.code} onChange={handleChange} />
                <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <input type="text" name="comment" placeholder="Comment (optional)" value={formData.comment} onChange={handleChange} />
                <button type="submit">Add Problem</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h2>Your Problems</h2>
            <ul>
                {problems.map((p) => (
                    <li key={p._id}>
                        {p.title} — {p.difficulty} — next revision: {new Date(p.next_revision_date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;