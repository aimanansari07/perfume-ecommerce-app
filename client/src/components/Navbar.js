import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    // 👇 Change 1: Get 'isAuth' and 'user' from the context
    const { isAuth, user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">Aroma</Link>
            <div className="nav-links">
                <Link to="/#products">Products</Link>
                <Link to="/#contact">Contact</Link>

                {/* 👇 Change 2: Use 'isAuth' for conditional logic */}
                {isAuth ? (
                    <>
                        {/* 👇 Change 3: Show Admin link only for admins */}
                        {user && user.role === 'admin' && (
                            <Link to="/admin">Admin</Link>
                        )}
                        <button onClick={logout} className="nav-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </div>
            <div className="nav-icons">
                <FiSearch />
                <FiShoppingBag />
            </div>
        </nav>
    );
}

export default Navbar;