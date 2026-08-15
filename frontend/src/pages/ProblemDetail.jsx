import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function ProblemDetail() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProblem();
    }, [id]);

    async function fetchProblem() {
        try {
            const res = await api.get(`/problems/${id}`);
            setProblem(res.data.problem);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load problem");
        }
    }

    if (error) return <div className="page-container"><p className="error-text">{error}</p></div>;
    if (!problem) return <div className="page-container"><p className="empty-state">Loading...</p></div>;

    return (
        <div className="page-container">
            <Link to="/dashboard">&larr; Back to Dashboard</Link>

            <div className="problem-detail-header">
                <h2>{problem.title}</h2>
                <span className={`difficulty-tag ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
            </div>

            <a href={problem.url} target="_blank" rel="noreferrer" className="problem-url">{problem.url}</a>

            {problem.comment && (
                <div className="detail-section">
                    <h3>Comment</h3>
                    <p>{problem.comment}</p>
                </div>
            )}

            <div className="detail-section">
                <h3>Code</h3>
                <pre className="code-block"><code>{problem.code}</code></pre>
            </div>
        </div>
    );
}

export default ProblemDetail;