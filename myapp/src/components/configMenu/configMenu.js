import React, { useState, useEffect } from 'react';
import './configMenu.css';
import Login from '../login/login';

export default function ConfigMenu({ closeConfigMenu, onLogout }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setIsLoggedIn(true);
            setUser(username);
        }
    }, []);

    const handleMenuToggle = () => setMenuOpen(!menuOpen);

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to logout');
            }

            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setIsLoggedIn(false);
            setUser('');
            onLogout();
            setMenuOpen(false);
        } catch (error) {
            setError('Erro ao fazer logout. Tente novamente.');
            console.error(error);
        }
    };

    const handleLoginClick = () => {
        setIsLoginOpen(true);
        setMenuOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsLoginOpen(false);
        setIsLoggedIn(true);
        const username = localStorage.getItem('username');
        setUser(username);
    };

    const handleCloseLogin = () => {
        setIsLoginOpen(false);
    };

    return (
        <div className="ConfigMenu">
            <button onClick={isLoggedIn ? handleMenuToggle : handleLoginClick}>
                {isLoggedIn ? 'Opções' : 'Login'}
            </button>
            {menuOpen && (
                <div className="menuDropdown">
                    {isLoggedIn ? (
                        <>
                            <button onClick={logout}>Logout</button>
                            {error && <div className="error">{error}</div>}
                        </>
                    ) : (
                        <button onClick={handleLoginClick}>Login</button>
                    )}
                    <button onClick={handleMenuToggle}>X</button>
                </div>
            )}
            {isLoginOpen && <Login closeLogin={handleCloseLogin} onSuccess={handleLoginSuccess} />}
        </div>
    );
}
