import React, { useState } from 'react';
import './login.css';

export default function Login({ closeLogin, onSuccess }) {
    const [error, setError] = useState('');

    function login(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unauthorized');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username); 
                onSuccess();
            })
            .catch((error) => {
                errorLogin(error.message);
            });
    }

    function errorLogin(message) {
        if (message === 'Unauthorized') {
            setError('Usuário ou senha inválidos');
        } else if (message === 'Failed to fetch') {
            setError('Erro ao realizar login');
        } else {
            setError('Erro desconhecido');
        }
    }

    return (
        <div className="LoginComponent">
            <div className="loginBackground">
                <button className="closeLogin" onClick={closeLogin}>X</button>
                <h2>Login</h2>
                <form onSubmit={login}>
                    <div className="errorMSG">{error}</div>
                    <div>
                        <label>Usuário: </label>
                        <input type="text" name="username" />
                    </div>
                    <div>
                        <label>Senha: </label>
                        <input type="password" name="password" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
