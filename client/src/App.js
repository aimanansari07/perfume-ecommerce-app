import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AddPerfume from './components/AddPerfume';
import PerfumeList from './components/PerfumeList';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthCallback from './components/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute'; // 1. Import ProtectedRoute

// Import CSS
import './App.css';

// Main public-facing component
const Home = () => (
    <>
        <Hero />
        <PerfumeList />
    </>
);

function App() {
  return (
    <Router>
        <Navbar />
        <main className="page-content">
            <Routes>
                <Route path="/" element={<Home />} />

                {/* 👇 This is the exact change 👇 */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            <div className="admin-page-wrapper">
                                <AddPerfume />
                            </div>
                        </ProtectedRoute>
                    } 
                />
                
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
        </main>
        <Footer />
    </Router>
  );
}

export default App;