import React from "react";
import "./cabecalho.css";

export default function Cabecalho() {

    return (
        <div className="campoCabecalho">
            <h1 className="cabecalhoTitle">D&D Fórum</h1>
            <div className="cabecalhoList">
                <button className="cabecalhoButton">Menu</button>
                <button className="cabecalhoButton">Raças</button>
                <button className="cabecalhoButton">Classes</button>
                <button className="cabecalhoButton">Feitiços</button>
                <button className="cabecalhoButton">Equipamentos</button>
            </div>
        </div>
    )
}