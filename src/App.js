import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [componenteAtivo, setComponenteAtivo] = useState("Buscar");
  let botaoValue = componenteAtivo === "Buscar" ? "List" : "Search";
  const exibirListar = () => {
    if (componenteAtivo === "Buscar") {
      setComponenteAtivo("Listar");
      botaoValue = "Buscar";
    } else {
      setComponenteAtivo("Buscar");
      botaoValue = "Listar";
    }
  };

  const renderizarComponenteAtivo = () => {
    if (componenteAtivo === "Listar") {
      return <ListMagiasComponent />;
    } else if (componenteAtivo === "Buscar") {
      return <SearchMagiaComponent />;
    } else {
      return "";
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

function SearchMagiaComponent() {
  return (
    <div id="CampoPesquisa">
      <p id="textSearch">Spell:</p>
      <input type="text" name="search" id="search"></input>
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

export default App;
