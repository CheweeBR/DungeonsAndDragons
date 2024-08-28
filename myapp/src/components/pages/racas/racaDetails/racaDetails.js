import React, { useEffect, useState } from "react";
import "./racaDetails.css";

export default function RacaDetails({ raca, onClose }) {
    const [racaDetails, setRacaDetails] = useState(null);

    useEffect(() => {
        fetch(`https://www.dnd5eapi.co/api/races/${raca.index}`)
            .then((response) => response.json())
            .then((data) => setRacaDetails(data))
            .catch((error) => console.error('Erro ao buscar os detalhes da raça:', error));
    }, [raca.index]);

    if (!racaDetails) {
        return null; 
    }

    const getAbilities = (data) => {
        if (!Array.isArray(data)) return '';
        return data.map(item => `${item.ability_score.name} +${item.bonus}`).join(', ');
    };

    const getTraits = (data) => {
        if (!Array.isArray(data)) return '';
        return data.map(item => item.name).join(', ');
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalDetalhes" onClick={(e) => e.stopPropagation()}>
                <button className="closeButton" onClick={onClose}>x</button>
                <h2>{racaDetails.name}</h2>
                <p><strong>Alinhamento:</strong> {racaDetails.alignment}</p>
                <p><strong>Idiomas:</strong> {racaDetails.language_desc}</p>
                <p><strong>Aumento de Habilidade:</strong> {getAbilities(racaDetails.ability_bonuses)}</p>
                <p><strong>Velocidade:</strong> {racaDetails.speed} pés</p>
                <p><strong>Traços:</strong> {getTraits(racaDetails.traits)}</p>
                <p><strong>Tamanho:</strong> {racaDetails.size_description}</p>
            </div>
        </div>
    );
}
