import {React, useState, useEffect} from "react";
import "./main.css";

export default function Main() {

    const [user, setUser] = useState("");

    const verificaUser = () => {
        if (user === "") {
            setUser("Aventureiro");
        }
    } 

    useEffect(() => {
        verificaUser();
    }, [user]);

    return (
        <div className="CampoMain">
            <div className="TextoDeApresentacao">
                <h2> Bem-vindo ao Fórum de D&D jovem {user}!</h2>
                <br/>
                <p className="textoPrincipal"> 
                    Prepare seus dados, afie suas espadas, e mergulhe no vasto universo de Dungeons & Dragons! 
                    <br/>
                    Este é o lugar onde aventureiros de todas as classes, raças e níveis se reúnem para compartilhar histórias épicas, discutir estratégias, trocar dicas de criação de personagens, e muito mais.
                    Que você seja um Mestre experiente ou um jogador iniciante, aqui você encontrará uma comunidade vibrante pronta para ajudar, inspirar e explorar novos mundos ao seu lado. Na Taverna do Aventureiro, cada post é uma nova aventura esperando para acontecer.
                    Puxe uma cadeira, peça uma caneca de hidromel virtual, e vamos construir juntos a próxima grande campanha!
                    Prepare-se para o inesperado, pois no D&D, as únicas limitações são a sua imaginação e a sorte dos dados.
                </p>
            </div>
        </div>
    )
}