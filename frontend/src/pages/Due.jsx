import { useState, useEffect } from "react";
import api from "../api/axios";

function Due() {
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState("");

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

    return (
        <div>
            <h1>Due for Revision</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {problems.length === 0 && <p>Nothing due right now.</p>}
            <ul>
                {problems.map((p) => (
                    <li key={p._id}>
                        {p.title} — {p.difficulty}
                        <button onClick={() => handleRevise(p._id, true)}>Solved it</button>
                        <button onClick={() => handleRevise(p._id, false)}>Couldn't solve it</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Due;