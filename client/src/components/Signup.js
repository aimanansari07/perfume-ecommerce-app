import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    // ... (your existing state and functions are the same)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => { e.preventDefault(); /* ... */ };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2>Create Your Account</h2>
                <p className="auth-subtitle">Join us to explore the world of fragrances.</p>
                
                {/* You can add a Google sign-up button here too if you like */}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-btn">Create Account</button>
                </form>
                
                {message && <p className="message">{message}</p>}
                <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}
export default Signup;