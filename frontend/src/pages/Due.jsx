import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { sortProblems } from "../utils/sortProblems";
import { filterProblems } from "../utils/filterProblems";

function Due() {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState("");
    const [sortOption, setSortOption] = useState("date-desc");
    const [filterOption, setFilterOption] = useState("all");

    useEffect(() => {
        fetchDue();
    }, []);

    async function fetchDue() {
        try {
            const res = await api.get("/problems/dueProblems");
            setProblems(res.data.problems);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load due problems");
        }
    }

    async function handleRevise(id, success) {
        try {
            await api.patch(`/problems/${id}/revise`, { success });
            fetchDue();
        } catch (err) {
            setError(err.response?.data?.message || "Could not update problem");
        }
    }

    const filteredProblems = filterProblems(problems, filterOption);
    const sortedProblems = sortProblems(filteredProblems, sortOption);

    return (
        <div className="page-container">
            <div className="dashboard-header">
                <h2>Due for Revision</h2>
            </div>

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

            {sortedProblems.length === 0 && <p className="empty-state">Nothing due right now — check back later.</p>}

            <ul className="problem-list">
                {sortedProblems.map((p) => (
                    <li key={p._id} className={`problem-card ${p.difficulty.toLowerCase()}`}>
                        <div>
                            <div className="problem-title">
                                <Link to={`/problem/${p._id}`} className="problem-title-link">{p.title}</Link>
                            </div>
                            <span className={`difficulty-tag ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                        </div>
                        <div className="problem-actions">
                            <button onClick={() => handleRevise(p._id, true)}>Solved it</button>
                            <button onClick={() => handleRevise(p._id, false)}>Couldn't solve it</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Due;