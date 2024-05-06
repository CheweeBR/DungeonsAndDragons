import "./App.css";
import React, { useState, useEffect } from "react";
import { useRef } from "react";

function App() {
  const [componenteAtivo, setComponenteAtivo] = useState("Buscar");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [resultadosPesquisa, setResultadosPesquisa] = useState([]);
  let botaoValue = componenteAtivo === "Buscar" ? "Listar" : "Buscar";

  const exibirListar = () => {
    if (componenteAtivo === "Buscar") {
      setComponenteAtivo("Listar");
    } else {
      setComponenteAtivo("Buscar");
    }
  };

  const renderizarComponenteAtivo = () => {
    if (componenteAtivo === "Listar") {
      return <ListMagiasComponent />;
    } else if (componenteAtivo === "Buscar") {
      return (
        <SearchMagiaComponent
          termoPesquisa={termoPesquisa}
          setTermoPesquisa={setTermoPesquisa}
          handleSearch={handleSearch}
          setResultadosPesquisa={setResultadosPesquisa}
        />
      );
    } else {
      return "";
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
      const filteredSpells = data.results.filter((spell) => {
        return startsWithCaseInsensitive(spell.name, searchTerm);
      });
      console.log("Chegou aqui");
      console.log(filteredSpells);
      setResultadosPesquisa(filteredSpells);
      return filteredSpells;
    } catch (error) {
      console.error("Error:", error);
      setResultadosPesquisa([]);
      return [];
    }
  };

  return (
    <div id="content">
      <div id="modalMain">
        <h2 id="textMain">Dungeons And Dragons 5: Spells</h2>
        <div id="botoes">
          <button onClick={exibirListar}> {botaoValue} </button>
        </div>
        {renderizarComponenteAtivo()}
        <div id="information"></div>
      </div>
    </div>
  );
}

function SearchMagiaComponent({ handleSearch, setResultadosPesquisa }) {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [sugestoesMagias, setSugestoesMagias] = useState([]);
  const [magiaSelecionada, setMagiaSelecionada] = useState(null);
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
            setSugestoesMagias([]);
          }
        });
      } else {
        setSugestoesMagias([]);
      }
    }, 300);
  };

  const handleSpellSelection = (magia) => {
    setMagiaSelecionada(magia);
  };

  return (
    <div id="CampoPesquisa">
      <p id="textSearch">Spell:</p>
      <input
        type="text"
        name="search"
        id="search"
        value={termoPesquisa}
        onChange={handleInputChange}
      />
      {}
      <></>
      <ul id="listSearch">
        {sugestoesMagias.map((magia, index) => (
          <li key={index} id="searchAparence">
            <button
              id="searchAparence"
              onClick={() => handleSpellSelection(magia)}
            >
              {magia.name}
            </button>
          </li>
        ))}
      </ul>
      {magiaSelecionada && (
        <div>
          <p>Magia selecionada: {magiaSelecionada.name}</p>
          <div id="spellNamBox">
            <h3 id="spellName">${magiaSelecionada.name}</h3>
          </div>
          <div id="othersInformation">
            <p>
              <strong>Escola:</strong> ${magiaSelecionada.school.name}
            </p>
            <p>
              <strong>Nível:</strong> ${magiaSelecionada.level}
            </p>
            <p>
              <strong>Tempo de Conjuração:</strong> $
              {magiaSelecionada.casting_time}
            </p>
            <p>
              <strong>Alcance:</strong> ${magiaSelecionada.range}
            </p>
            <p>
              <strong>Componentes:</strong> $
              {magiaSelecionada.components.join(", ")}
            </p>
            <p>
              <strong>Duração:</strong> ${magiaSelecionada.duration}
            </p>
            <p>
              <strong>Descrição:</strong> ${magiaSelecionada.desc.join("<br>")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ListMagiasComponent() {
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
          <a id="searchAparence">{magia.name}</a>
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

function startsWithCaseInsensitive(fullString, searchString) {
  return fullString.toLowerCase().startsWith(searchString.toLowerCase());
}

export default App;
