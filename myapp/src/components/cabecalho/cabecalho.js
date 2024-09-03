import React, { useState } from "react";
import "./cabecalho.css";

export default function Cabecalho({ onMenuChange }) {
    const [select, setSelect] = useState("Menu");

    const handleClick = (page) => {
        console.log("Selecionado:", page);
        setSelect(page);
        onMenuChange(page);
    };

    return (
        <div className="campoCabecalho">
            <h1 className="cabecalhoTitle">D&D Wiki</h1>
            <div className="cabecalhoList">
                <button 
                    className={select === "Menu" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => handleClick("Main")} 
                >
                    Menu
                </button>
                <button 
                    className={select === "Racas" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => handleClick("Racas")} 
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
                    className={select === "Feiticos" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => handleClick("Feiticos")} 
                >
                    Feitiços
                </button>
            </div>
        </div>
    );
}
