import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Due from "./pages/Due";
import Flagged from "./pages/Flagged";
import ProblemDetail from "./pages/ProblemDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/due" element={<ProtectedRoute><Due /></ProtectedRoute>} />
                <Route path="/flagged" element={<ProtectedRoute><Flagged /></ProtectedRoute>} />
                <Route path="/problem/:id" element={<ProtectedRoute><ProblemDetail /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;