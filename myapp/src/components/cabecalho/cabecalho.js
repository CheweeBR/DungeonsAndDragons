import React, { useState } from "react";
import "./cabecalho.css";

export default function Cabecalho() {
    const [select, setSelect] = useState("Menu");

    return (
        <div className="campoCabecalho">
            <h1 className="cabecalhoTitle">D&D Wiki</h1>
            <div className="cabecalhoList">
                <button 
                    className={select === "Menu" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => setSelect("Menu")}
                >
                    Menu
                </button>
                <button 
                    className={select === "Raças" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => setSelect("Raças")}
                >
                    Raças
                </button>
                <button 
                    className={select === "Classes" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => setSelect("Classes")}
                >
                    Classes
                </button>
                <button 
                    className={select === "Feitiços" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => setSelect("Feitiços")}
                >
                    Feitiços
                </button>
                <button 
                    className={select === "Equipamentos" ? "cabecalhoButton-active" : "cabecalhoButton"}
                    onClick={() => setSelect("Equipamentos")}
                >
                    Equipamentos
                </button>
            </div>
        </div>
    );
}
