import React, { useEffect, useState } from "react";
import "../feiticos.css";

export default function FeiticosDetails({ magiaSelecionada }) {
    const [detalhesMagia, setDetalhesMagia] = useState(null);

    useEffect(() => {
        if (magiaSelecionada) {
            fetch(`https://www.dnd5eapi.co/api/spells/${magiaSelecionada.index}`)
                .then((response) => response.json())
                .then((data) => setDetalhesMagia(data))
                .catch((error) =>
                    console.error("Erro ao buscar detalhes da magia:", error)
                );
        }
    }, [magiaSelecionada]);

    return (
        <div>
            {detalhesMagia ? (
                <div>
                    <div id="spellNamBox">
                        <h3 id="spellName">{detalhesMagia.name}</h3>
                    </div>
                    <div id="othersInformation">
                        <p><strong>Escola:</strong> {detalhesMagia.school.name}</p>
                        <p><strong>Nível:</strong> {detalhesMagia.level}</p>
                        <p><strong>Tempo de Conjuração:</strong> {detalhesMagia.casting_time}</p>
                        <p><strong>Alcance:</strong> {detalhesMagia.range}</p>
                        <p><strong>Componentes:</strong> {detalhesMagia.components.join(", ")}</p>
                        <p><strong>Duração:</strong> {detalhesMagia.duration}</p>
                        <p><strong>Descrição:</strong> {detalhesMagia.desc.join("<br>")}</p>
                    </div>
                </div>
            ) : (
                <p>Carregando detalhes da magia...</p>
            )}
        </div>
    );
}
