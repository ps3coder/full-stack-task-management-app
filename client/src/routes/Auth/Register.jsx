import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterForm from "../../pages/Auth/RegisterForm";

const Register = () => {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/register",
                { userName: formData.userName, password: formData.password },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.status === 201) {
                navigate("/login");
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (err) {
            const message =
                err.response?.data?.message || "Registration failed. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RegisterForm handleSubmit={handleSubmit} formData={formData} error={error} handleChange={handleChange} isLoading={isLoading} />
    );
};

export default Register;
