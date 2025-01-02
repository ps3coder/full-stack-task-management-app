import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../pages/Auth/LoginForm";

const Login = () => {
    const [formData, setFormData] = useState({ userName: "", password: "" });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/login",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            updateUser(res.data);  // Correctly call the updateUser function

            if (res.status === 200) {
                const testRes = await axios.get(
                    "http://localhost:3000/api/test/should-be-logged-in",
                    {
                        withCredentials: true,
                    }
                );

                if (testRes.data.message === "You are Authenticated") {
                    navigate("/");
                }
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (err) {
            const message =
                err.response?.data?.message || "Login failed. Please try again.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginForm handleSubmit={handleSubmit} formData={formData} error={error} handleChange={handleChange} isLoading={isLoading} />
    );
};

export default Login;