import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { sortProblems } from "../utils/sortProblems";
import { filterProblems } from "../utils/filterProblems";

function Dashboard() {
    const [problems, setProblems] = useState([]);
    const [formData, setFormData] = useState({ title: "", url: "", code: "", difficulty: "Easy", comment: "" });
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [sortOption, setSortOption] = useState("date-desc");
    const [filterOption, setFilterOption] = useState("all");

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
            setShowForm(false);
            fetchProblems();
        } catch (err) {
            setError(err.response?.data?.message || "Could not add problem");
        }
    }

    async function handleToggleFlag(id) {
        try {
            await api.patch(`/problems/${id}/flag`);
            fetchProblems();
        } catch (err) {
            setError(err.response?.data?.message || "Could not update flag");
        }
    }

    const filteredProblems = filterProblems(problems, filterOption);
    const sortedProblems = sortProblems(filteredProblems, sortOption);

    return (
        <div className="page-container">
            <div className="dashboard-header">
                <h2>Your Problems</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Cancel" : "+ Add Problem"}
                </button>
            </div>

            {showForm && (
                <form className="add-problem-form" onSubmit={handleSubmit}>
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
            )}

            {error && <p className="error-text">{error}</p>}

            <div className="list-controls">
                <select className="sort-select" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                    <option value="all">All difficulties</option>
                    <option value="Easy">Easy only</option>
                    <option value="Medium">Medium only</option>
                    <option value="Hard">Hard only</option>
                </select>
                <select className="sort-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="date-desc">Newest first</option>
                    <option value="date-asc">Oldest first</option>
                    <option value="difficulty-asc">Difficulty: Easy → Hard</option>
                    <option value="difficulty-desc">Difficulty: Hard → Easy</option>
                </select>
            </div>

            {sortedProblems.length === 0 && <p className="empty-state">Nothing here yet.</p>}

            <ul className="problem-list">
                {sortedProblems.map((p) => (
                    <li key={p._id} className={`problem-card ${p.difficulty.toLowerCase()}`}>
                        <div>
                            <div className="problem-title">
                                <Link to={`/problem/${p._id}`} className="problem-title-link">{p.title}</Link>
                            </div>
                            <div className="problem-meta">next revision: {new Date(p.next_revision_date).toLocaleDateString()}</div>
                        </div>
                        <div className="problem-actions">
                            <span className={`difficulty-tag ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                            <button
                                className={p.is_flagged ? "flag-btn flagged" : "flag-btn"}
                                onClick={() => handleToggleFlag(p._id)}
                            >
                                {p.is_flagged ? "🚩 Flagged" : "🚩 Flag"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;