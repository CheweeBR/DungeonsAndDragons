import React, { useEffect, useState } from "react";
import "./classeDetails.css";

export default function ClasseDetails({ classe, onClose, image }) {
    const [classDetails, setClassDetails] = useState(null);

    useEffect(() => {
        fetch(`https://www.dnd5eapi.co/api/classes/${classe.index}`)
            .then((response) => response.json())
            .then((data) => setClassDetails(data))
            .catch((error) => console.error('Erro ao buscar os detalhes da classe:', error));
    }, [classe.index]);

    if (!classDetails) {
        return null; 
    }

    const renderListItems = (data) => {
        if (!Array.isArray(data)) return null;
        return data.map(item => <li key={item.index}>{item.name}</li>);
    };

    const renderOptionsList = (data) => {
        if (!Array.isArray(data)) return null;
        return data.map((option, index) => <li key={index}>{option.desc}</li>);
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalDetalhes" onClick={(e) => e.stopPropagation()}>
                <button className="closeButton" onClick={onClose}>x</button>
                <h2>{classDetails.name}</h2>
                <p><strong>Hit Die:</strong> {classDetails.hit_die}</p>

                <p><strong>Proficiências:</strong></p>
                <ul>
                    {renderListItems(classDetails.proficiencies)}
                </ul>

                <p><strong>Escolhas de Perícias:</strong></p>
                <ul>
                    {renderListItems(classDetails.proficiency_choices?.[0]?.from?.options?.map(option => option.item))}
                </ul>

                <p><strong>Equipamento Inicial:</strong></p>
                <ul>
                    {renderListItems(classDetails.starting_equipment?.map(item => ({ ...item.equipment, name: `${item.equipment.name} (x${item.quantity})` })))}
                </ul>

                <p><strong>Opções de Equipamento Inicial:</strong></p>
                <ul>
                    {renderOptionsList(classDetails.starting_equipment_options)}
                </ul>

                <p><strong>Salvaguardas:</strong></p>
                <ul>
                    {renderListItems(classDetails.saving_throws)}
                </ul>

                <p><strong>Subclasses:</strong></p>
                <ul>
                    {renderListItems(classDetails.subclasses)}
                </ul>

                <p><strong>Requisitos para Multiclasse:</strong> Wisdom mínimo de 13, Proficiente em:</p>
                <ul>
                    {renderListItems(classDetails.multi_classing.proficiencies)}
                </ul>

                {classDetails.spellcasting && (
                    <>
                        <p><strong>Nível de Conjuração:</strong> {classDetails.spellcasting.level}</p>
                        <p><strong>Habilidade de Conjuração:</strong> {classDetails.spellcasting.spellcasting_ability.name}</p>
                        <p><strong>Informações de Conjuração:</strong></p>
                        <ul>
                            {classDetails.spellcasting.info.map((info, index) => (
                                <li key={index}><strong>{info.name}:</strong> {info.desc.join(' ')}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
