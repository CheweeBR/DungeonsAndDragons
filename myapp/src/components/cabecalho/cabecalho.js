import React, { useState } from "react";
import "./cabecalho.css";

export default function Cabecalho({ onMenuChange }) {
    const [select, setSelect] = useState("Menu");

    const handleClick = (page) => {
        setSelect(page);
        onMenuChange(page);
    };

    return (
        <div className="campoCabecalho">
            <h1 className="cabecalhoTitle">D&D Wiki</h1>
            <div className="cabecalhoList">
                <button 
                    className={select === "Menu" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => handleClick("Menu")}
                >
                    Menu
                </button>
                <button 
                    className={select === "Raças" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => handleClick("Raças")}
                >
                    Raças
                </button>
                <button 
                    className={select === "Classes" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => handleClick("Classes")}
                >
                    Classes
                </button>
                <button 
                    className={select === "Feitiços" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => handleClick("Feitiços")}
                >
                    Feitiços
                </button>
                <button 
                    className={select === "Equipamentos" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => handleClick("Equipamentos")}
                >
                    Equipamentos
                </button>
            </div>
        </div>
    );
}