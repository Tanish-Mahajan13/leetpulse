import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function ProblemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ title: "", url: "", code: "", difficulty: "Easy", comment: "" });

    useEffect(() => {
        fetchProblem();
    }, [id]);

    async function fetchProblem() {
        try {
            const res = await api.get(`/problems/${id}`);
            setProblem(res.data.problem);
            setFormData({
                title: res.data.problem.title,
                url: res.data.problem.url,
                code: res.data.problem.code,
                difficulty: res.data.problem.difficulty,
                comment: res.data.problem.comment
            });
        } catch (err) {
            setError(err.response?.data?.message || "Could not load problem");
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleUpdate(e) {
        e.preventDefault();
        setError("");
        try {
            const res = await api.patch(`/problems/${id}`, formData);
            setProblem(res.data.problem);
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || "Could not update problem");
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm("Delete this problem? This can't be undone.");
        if (!confirmed) return;

        try {
            await api.delete(`/problems/${id}`);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Could not delete problem");
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

            <div className="detail-actions">
                <button className="btn-secondary" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel" : "Edit"}
                </button>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
            </div>

            {error && <p className="error-text">{error}</p>}

            {isEditing ? (
                <form className="add-problem-form" onSubmit={handleUpdate}>
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
                    <input type="text" name="url" placeholder="URL" value={formData.url} onChange={handleChange} />
                    <textarea name="code" placeholder="Your code" value={formData.code} onChange={handleChange} />
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <input type="text" name="comment" placeholder="Comment (optional)" value={formData.comment} onChange={handleChange} />
                    <button type="submit">Save Changes</button>
                </form>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default ProblemDetail;