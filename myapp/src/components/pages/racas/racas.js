import React, { useEffect, useState } from "react";
import RacaDetails from "./racaDetails/racaDetails"; 
import "./racas.css"; 

export default function Racas() {
    const [racas, setRacas] = useState([]);
    const [selectedRaca, setSelectedRaca] = useState(null);

    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/races')
            .then((response) => response.json())
            .then((data) => setRacas(data.results))
            .catch((error) => console.error('Erro ao buscar as raças:', error));
    }, []);

    const getRacaImage = (racaName) => {
        try {
            return require(`../../../assets/racas/${racaName.toLowerCase()}.png`);
        } catch (error) {
            console.error('Erro ao buscar a imagem da raça:', error);
            return '';
        }
    };

    const handleRacaClick = (raca) => {
        setSelectedRaca(raca);
    };

    const handleCloseModal = () => {
        setSelectedRaca(null);
    };

    return (
        <div className="campoRaca">
            <div className="descricaoRaca">
                <p className="textoRaca">
                    Em Dungeons & Dragons (D&D), as raças são fundamentais para a criação de personagens e definem o fundo racial do personagem, influenciando suas características e habilidades.
                    Cada raça oferece um conjunto único de traços e poderes, afetando a forma como o personagem interage com o mundo e se desenvolve.
                </p>
            </div>
            <div className="modalRacas">
                {racas.map((raca, index) => (
                    <div
                        key={index}
                        className="racaItem"
                        style={{
                            backgroundImage: `url(${getRacaImage(raca.name)})`,
                        }}
                        onClick={() => handleRacaClick(raca)}
                    >
                        <h3 className="nomeRaca">{raca.name}</h3>
                        <p>{raca.desc}</p>
                    </div>
                ))}
            </div>
            {selectedRaca && (
                <RacaDetails raca={selectedRaca} onClose={handleCloseModal} />
            )}
        </div>
    );
}
