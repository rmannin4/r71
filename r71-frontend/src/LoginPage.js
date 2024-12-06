import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://165.22.7.42:3000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/login`, { username, password });
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            console.log(localStorage.getItem('token')); // Debugging to ensure token is saved
        } catch (error) {
            console.error('Login failed:', error.response || error.message);
            alert('Invalid credentials');
        }
    };    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h1 className="text-center mb-4">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
