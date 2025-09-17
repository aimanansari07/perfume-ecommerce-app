import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            login(token); // Save the token using our context
            navigate('/'); // Redirect to the homepage
        } else {
            navigate('/login'); // Redirect to login on failure
        }
    }, [searchParams, login, navigate]);

    return <div>Loading...</div>;
}

export default AuthCallback;