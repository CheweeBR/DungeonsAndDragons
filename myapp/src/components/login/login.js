import React from 'react';
import './login.css';

export default function Login({ closeLogin }) {
    return (
        <div className="LoginComponent">
            <div className="loginBackground">
                <button className="closeLogin" onClick={closeLogin}>X</button>
                <h2>Login</h2>
                <form>
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
