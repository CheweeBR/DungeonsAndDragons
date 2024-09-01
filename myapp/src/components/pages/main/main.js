import React, { useState, useEffect } from "react";
import "./main.css";
import Login from "../../login/login";

export default function Main() {
    const [user, setUser] = useState("");
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const verificaUser = () => {
        if (user === "") {
            setUser("Aventureiro");
        }
    }

    useEffect(() => {
        verificaUser();
    }, [user]);

    const handleLoginClick = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    return (
        <div className="CampoMain">
            <div className="TextoDeApresentacao">
                <h2>Bem-vindo ao Wiki de Dungeons and Dragons jovem {user}!</h2>
                <br />
                <p className="textoPrincipal">
                    Mergulhe no universo de Dungeons & Dragons com nosso Wiki abrangente e interativo!
                    <br />
                    <br />
                    Este é o lugar ideal para explorar todas as facetas do jogo, incluindo detalhes sobre <strong>Raças</strong>, <strong>Classes</strong> e <strong>Feitiços</strong>.
                    <br />
                    <br />
                    <strong>Raças:</strong> Descubra as diversas raças que você pode escolher para seu personagem, cada uma com suas habilidades únicas e histórias fascinantes. <br />
                    <strong>Classes:</strong> Conheça as diferentes classes que definem as habilidades e o papel do seu personagem nas aventuras, desde guerreiros destemidos até magos poderosos. <br />
                    <strong>Feitiços:</strong> Explore uma ampla gama de feitiços e magias, com descrições detalhadas e efeitos, para aprimorar suas estratégias e criar combinações mágicas. <br />
                    <br />
                    Nosso Wiki oferece informações precisas e atualizadas, tanto para jogadores veteranos quanto para iniciantes.
                    <br />
                    Prepare-se para desbravar masmorras, enfrentar dragões e viver aventuras inesquecíveis.
                    <br />
                    Aventura aguarda. Que comece a jornada com o Wiki do D&D como seu guia!
                </p>
                <h2>Não se esqueça de realizar seu <a className="textLogin" onClick={handleLoginClick}>Login</a> para ter uma experiencia Personalizada.</h2>
            </div>
            {isLoginOpen && <Login closeLogin={handleLoginClick} />}
        </div>
    );
}

