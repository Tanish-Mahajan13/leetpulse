import { useState, useEffect } from "react";
import api from "../api/axios";

function Flagged() {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFlagged();
    }, []);

    async function fetchFlagged() {
        try {
            const res = await api.get("/problems/flaggedProblems")
            setProblems(res.data.problem);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load flagged problems");
        }
    }

    async function handleUnflag(id) {
        try {
            await api.patch(`/problems/${id}/flag`);
            fetchFlagged();
        } catch (err) {
            setError(err.response?.data?.message || "Could not update problem");
        }
    }

    return (
        <div>
            <h1>Flagged Problems</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {problems.length === 0 && <p>No flagged problems.</p>}
            <ul>
                {problems.map((p) => (
                    <li key={p._id}>
                        {p.title} — {p.difficulty}
                        <button onClick={() => handleUnflag(p._id)}>Unflag</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Flagged;