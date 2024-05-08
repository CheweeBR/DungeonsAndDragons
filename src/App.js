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

function SearchMagiaComponent({ handleSearch, magiaSelecionada }) {
  const [termoPesquisa, setTermoPesquisa] = useState("");
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
        <p id="textSearch">Spell:</p>
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
                  magiaSelecionada(magia.name);
                }}
              >
                {magia.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MagiaInfoComponent({ magiaSelecionada }) {
  const [detalhesMagia, setDetalhesMagia] = useState(null);

  useEffect(() => {
    if (magiaSelecionada) {
      // Aqui você faria a busca detalhada na API com base na magia selecionada
      fetch(`URL_DA_SUA_API/${magiaSelecionada.id}`)
        .then((response) => response.json())
        .then((data) => setDetalhesMagia(data))
        .catch((error) =>
          console.error("Erro ao buscar detalhes da magia:", error)
        );
    }
  }, [magiaSelecionada]);

  return (
    <div>
      <p>Magia selecionada: {magiaSelecionada.name}</p>
      {detalhesMagia ? (
        <div>
          <div id="spellNamBox">
            <h3 id="spellName">${detalhesMagia.name}</h3>
          </div>
          <div id="othersInformation">
            <p>
              <strong>Escola:</strong> ${detalhesMagia.school.name}
            </p>
            <p>
              <strong>Nível:</strong> ${detalhesMagia.level}
            </p>
            <p>
              <strong>Tempo de Conjuração:</strong> $
              {detalhesMagia.casting_time}
            </p>
            <p>
              <strong>Alcance:</strong> ${detalhesMagia.range}
            </p>
            <p>
              <strong>Componentes:</strong> $
              {detalhesMagia.components.join(", ")}
            </p>
            <p>
              <strong>Duração:</strong> ${detalhesMagia.duration}
            </p>
            <p>
              <strong>Descrição:</strong> ${detalhesMagia.desc.join("<br>")}
            </p>
          </div>
        </div>
      ) : (
        <p>Carregando detalhes da magia...</p>
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
