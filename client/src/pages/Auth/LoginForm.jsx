import React from 'react';
import { Link } from "react-router-dom";
import '../../styles/AuthForm.css'

const LoginForm = ({ handleSubmit, formData, error, isLoading, handleChange }) => {
    return (
        <div className="form-container">
            <h2 className="form-title">Login</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="form-button" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p className="form-footer">
                Don’t have an account? <Link to="/register" className="form-link">Register here</Link>.
            </p>
        </div>
    );
};

export default LoginForm;
