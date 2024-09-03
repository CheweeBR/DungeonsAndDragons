import React, { useState, useEffect } from "react";
import "./main.css";
import Login from "../../login/login";

export default function Main() {
    const [user, setUser] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token && username) {
            setIsLoggedIn(true);
            setUser(username);
        } else {
            setUser("Aventureiro");
        }
    }, []);

    const handleLoginClick = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const handleLoginSuccess = () => {
        setIsLoginOpen(false);
        setIsLoggedIn(true);
        const username = localStorage.getItem('username');
        setUser(username);
    };

    return (
        <div className="CampoMain">
            <div className="TextoDeApresentacao">
                <h2>Bem-vindo ao Wiki de Dungeons and Dragons jovem {user}!</h2>
                <br />
                <p className="textoPrincipal">
                    Mergulhe no universo de Dungeons & Dragons com nosso Wiki abrangente e interativo!
                    <br /><br />
                    Este é o lugar ideal para explorar todas as facetas do jogo, incluindo detalhes sobre <strong>Raças</strong>, <strong>Classes</strong> e <strong>Feitiços</strong>.
                    <br /><br />
                    <strong>Raças:</strong> Descubra as diversas raças que você pode escolher para seu personagem, cada uma com suas habilidades únicas e histórias fascinantes. <br />
                    <strong>Classes:</strong> Conheça as diferentes classes que definem as habilidades e o papel do seu personagem nas aventuras, desde guerreiros destemidos até magos poderosos. <br />
                    <strong>Feitiços:</strong> Explore uma ampla gama de feitiços e magias, com descrições detalhadas e efeitos, para aprimorar suas estratégias e criar combinações mágicas. <br /><br />
                    Nosso Wiki oferece informações precisas e atualizadas, tanto para jogadores veteranos quanto para iniciantes.
                    <br />
                    Prepare-se para desbravar masmorras, enfrentar dragões e viver aventuras inesquecíveis.
                    <br />
                    A aventura aguarda. Que comece a jornada com o Wiki do D&D como seu guia!
                </p>
                {!isLoggedIn && (
                    <h2>
                        Não se esqueça de realizar seu{" "}
                        <button
                            className="textLogin"
                            onClick={handleLoginClick}
                            style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer', fontSize: '1em' }}
                        >
                            Login
                        </button>{" "}
                        para ter uma experiência personalizada.
                    </h2>
                )}
            </div>
            {isLoginOpen && <Login closeLogin={handleLoginClick} onSuccess={handleLoginSuccess} />}
        </div>
    );
}
