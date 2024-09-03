import React, { useEffect, useState, useRef } from "react";
import "./feiticos.css";
import FeiticosDetails from "./feiticoDetails/feiticoDetails";

export default function Feiticos() {
    const [componenteAtivo, setComponenteAtivo] = useState("Buscar");
    const [termoPesquisa, setTermoPesquisa] = useState("");
    const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
    const [magiaSelecionada, setMagiaSelecionada] = useState(null);

    const exibirListar = () => {
        setComponenteAtivo(componenteAtivo === "Buscar" ? "Listar" : "Buscar");
        setMagiaSelecionada(null);
    };

    const renderizarComponenteAtivo = () => {
        if (componenteAtivo === "Listar") {
            return <ListMagiasComponent setMagiaSelecionada={handleMagiaSelecionada} />;
        } else if (componenteAtivo === "Buscar") {
            return (
                <SearchMagiaComponent
                    termoPesquisa={termoPesquisa}
                    setTermoPesquisa={setTermoPesquisa}
                    handleSearch={handleSearch}
                    setResultadosPesquisa={setResultadosPesquisa}
                    setMagiaSelecionada={handleMagiaSelecionada}
                    exibirListar={exibirListar} 
                    componenteAtivo={componenteAtivo} 
                />
            );
        } else {
            return null;
        }
    };

    const handleSearch = async (searchTerm) => {
        try {
            const apiUrl = "https://www.dnd5eapi.co/api/spells/?name=" + searchTerm;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Erro de conexão.");
            }
            const data = await response.json();
            const filteredSpells = data.results.filter((spell) =>
                startsWithCaseInsensitive(spell.name, searchTerm)
            );
            setResultadosPesquisa(filteredSpells);
            setMagiaSelecionada(null);
            return filteredSpells;
        } catch (error) {
            console.error("Error:", error);
            setResultadosPesquisa([]);
            return [];
        }
    };

    const startsWithCaseInsensitive = (fullString, searchString) =>
        fullString.toLowerCase().startsWith(searchString.toLowerCase());

    const handleMagiaSelecionada = (magia) => {
        setMagiaSelecionada(magia);
        setComponenteAtivo("Buscar");
        setTermoPesquisa("");
        setResultadosPesquisa([]);
    };

    return (
        <div id="content">
            <div id="modalMain">
                {renderizarComponenteAtivo()}
                {magiaSelecionada && (
                    <FeiticosDetails magiaSelecionada={magiaSelecionada} />
                )}
                <div id="information"></div>
            </div>
        </div>
    );
}

function ListMagiasComponent({ setMagiaSelecionada }) {
    const [magias, setMagias] = useState([]);

    useEffect(() => {
        listarMagias().then((result) => {
            setMagias(result);
        });
    }, []);

    return (
        <ol id="listSearch">
            {magias.map((magia, index) => (
                <li key={index}>
                    <a
                        id="searchAparence"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setMagiaSelecionada(magia);
                        }}
                    >
                        {magia.name}
                    </a>
                </li>
            ))}
        </ol>
    );
}

function listarMagias() {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    return fetch("https://www.dnd5eapi.co/api/spells", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result.results;
        })
        .catch((error) => console.error(error));
}

function SearchMagiaComponent({ termoPesquisa, setTermoPesquisa, handleSearch, setMagiaSelecionada, exibirListar, componenteAtivo }) {
    const [sugestoesMagias, setSugestoesMagias] = useState([]);
    const timeoutRef = useRef(null);

    const handleInputChange = (event) => {
        const searchTerm = event.target.value;
        setTermoPesquisa(searchTerm);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (searchTerm.trim() !== "") {
                handleSearch(searchTerm).then((sugestoes) => {
                    if (sugestoes && sugestoes.length > 0) {
                        setSugestoesMagias(sugestoes);
                    } else {
                        setSugestoesMagias([{ name: "Magia não encontrada" }]);
                    }
                });
            } else {
                setSugestoesMagias([]);
            }
        }, 300);
    };

    return (
        <div id="CampoPesquisaGeral">
            <div id="CampoPesquisa">
                <p id="textSearch">Search:</p>
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={termoPesquisa}
                    onChange={handleInputChange}
                />
            </div>
            <div id="barra-busca">
                <ul id="listSearch">
                    {sugestoesMagias.map((magia, index) => (
                        <li key={index} id="searchAparence">
                            <a
                                id="searchAparence"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setMagiaSelecionada(magia);
                                    setSugestoesMagias([]);
                                }}
                            >
                                {magia.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="botoes">
                <button onClick={exibirListar} className="botao-icone">
                    {componenteAtivo === "Buscar" ? "List" : "❌"}
                </button>
            </div>
        </div>
    );
}
