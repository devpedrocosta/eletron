// Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = () => {
    const history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        history("/signup");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the Dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
