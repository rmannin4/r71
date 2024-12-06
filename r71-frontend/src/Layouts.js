import React from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layouts = ({ token, handleLogout }) => {
    // Redirect to login if the user is not authenticated
    if (!token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="/">R71</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/summary">Summary</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reports">Reports</Link>
                            </li>
                        </ul>
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mt-4">
                <Outlet /> {/* Renders the child route component */}
            </main>
        </div>
    );
};

export default Layouts;
