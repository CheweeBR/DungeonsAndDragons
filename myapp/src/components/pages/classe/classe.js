import React, { useEffect, useState } from "react";
import ClasseDetails from "./classeDetails/classeDetails";
import "./classe.css";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        fetch('https://www.dnd5eapi.co/api/classes')
            .then((response) => response.json())
            .then((data) => setClasses(data.results))
            .catch((error) => console.error('Erro ao buscar as classes:', error));
    }, []);

    const getClassImage = (className) => {
        try {
            return require(`../../../assets/classes/${className.toLowerCase()}.png`);
        } catch (error) {
            console.error('Erro ao buscar a imagem da classe:', error);
            return '';
        }
    };

    const handleClassClick = (classe) => {
        setSelectedClass(classe);
    };

    const handleCloseModal = () => {
        setSelectedClass(null);
    };

    return (
        <div className="campoClasse">
            <div className="descricaoClasse">
                <p className="textoClasse">
                    Em Dungeons & Dragons (D&D), as classes são fundamentais para a criação de personagens e definem o papel, as habilidades e o estilo de jogo de cada aventureiro.
                    Cada classe oferece um conjunto único de habilidades e poderes, influenciando diretamente como o personagem interage com o mundo, enfrenta desafios e contribui para o grupo.
                </p>
            </div>
            <div className="modalClasses">
                {classes.map((classe, index) => (
                    <div
                        key={index}
                        className="classeItem"
                        style={{
                            backgroundImage: `url(${getClassImage(classe.name)})`,
                        }}
                        onClick={() => handleClassClick(classe)}
                    >
                        <h3 className="nomeClasse">{classe.name}</h3>
                        <p>{classe.desc}</p>
                    </div>
                ))}
            </div>
            {selectedClass && (
                <ClasseDetails classe={selectedClass} onClose={handleCloseModal} />
            )}
        </div>
    );
}
