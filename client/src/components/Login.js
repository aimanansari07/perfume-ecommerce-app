import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    // Get the login function from our global context
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginRes = await axios.post('http://localhost:5000/api/users/login', loginUser);
            
            // This is the key change: we now pass the token AND user data to the login function
            login(loginRes.data.token, loginRes.data.user);
            
            navigate('/'); // Redirect to homepage on success
        } catch (err) {
            setMessage(err.response?.data?.msg || 'An error occurred.');
        }
    };

    const googleLogin = () => { window.location.href = 'http://localhost:5000/api/auth/google'; };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Log in to access your account.</p>
                
                <button onClick={googleLogin} className="social-btn google-btn">
                    <FcGoogle /> Sign In with Google
                </button>
                
                <div className="divider"><span>OR</span></div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="auth-btn">Login</button>
                </form>
                
                {message && <p className="message">{message}</p>}
                <p className="auth-switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
}
export default Login;