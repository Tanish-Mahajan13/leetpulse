import { useState, useEffect } from "react";
import api from "../api/axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [problems, setProblems] = useState([]);
    const [dueCount, setDueCount] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfileData();
    }, []);

    async function fetchProfileData() {
        try {
            const [meRes, problemsRes, dueRes] = await Promise.all([
                api.get("/users/me"),
                api.get("/problems/getProblems"),
                api.get("/problems/dueProblems")
            ]);

            setUser(meRes.data.user);
            setProblems(problemsRes.data.problems);
            setDueCount(dueRes.data.problems.length);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load profile");
        }
    }

    if (error) return <div className="page-container"><p className="error-text">{error}</p></div>;
    if (!user) return <div className="page-container"><p className="empty-state">Loading...</p></div>;

    const total = problems.length;
    const easyCount = problems.filter((p) => p.difficulty === "Easy").length;
    const mediumCount = problems.filter((p) => p.difficulty === "Medium").length;
    const hardCount = problems.filter((p) => p.difficulty === "Hard").length;

    return (
        <div className="page-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                    </svg>
                </div>
                <div>
                    <h2>{user.name}</h2>
                    <p className="profile-email">{user.email}</p>
                </div>
            </div>

            <div className="stat-grid">
                <div className="stat-card">
                    <span className="stat-number">{total}</span>
                    <span className="stat-label">Total Solved</span>
                </div>
                <div className="stat-card highlight">
                    <span className="stat-number">{dueCount}</span>
                    <span className="stat-label">Due for Revision</span>
                </div>
            </div>

            <h3 className="breakdown-title">Difficulty Breakdown</h3>
            <div className="breakdown-list">
                <div className="breakdown-row">
                    <span className="difficulty-tag easy">Easy</span>
                    <div className="breakdown-bar-track">
                        <div
                            className="breakdown-bar-fill easy"
                            style={{ width: total ? `${(easyCount / total) * 100}%` : "0%" }}
                        ></div>
                    </div>
                    <span className="breakdown-count">{easyCount}</span>
                </div>
                <div className="breakdown-row">
                    <span className="difficulty-tag medium">Medium</span>
                    <div className="breakdown-bar-track">
                        <div
                            className="breakdown-bar-fill medium"
                            style={{ width: total ? `${(mediumCount / total) * 100}%` : "0%" }}
                        ></div>
                    </div>
                    <span className="breakdown-count">{mediumCount}</span>
                </div>
                <div className="breakdown-row">
                    <span className="difficulty-tag hard">Hard</span>
                    <div className="breakdown-bar-track">
                        <div
                            className="breakdown-bar-fill hard"
                            style={{ width: total ? `${(hardCount / total) * 100}%` : "0%" }}
                        ></div>
                    </div>
                    <span className="breakdown-count">{hardCount}</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;