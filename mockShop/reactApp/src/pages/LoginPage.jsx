import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../assets/loginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState(null);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setValidationError(null); // Clear validation error on input change
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Form data:", form);
        const response = await fetch('http://localhost:8000/api/accounts/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            navigate('/admin-dash');

        } else {
            const errorData = await response.json();
            console.error("Login failed:", errorData);
            setValidationError(errorData.detail || "Login failed");
        }
    };


    return (
        <main>
            <div className="loginPage">
                <h1 style={{ marginTop: '8rem' }}>Login</h1>
                <form className="loginForm" onSubmit={handleLogin}>
                    {validationError && <p style={{ color: 'red' }}>{validationError}</p>}

                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required />
                    </div>
                    <button className="loginButton" type="submit" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </main>
    )
};


export default LoginPage;